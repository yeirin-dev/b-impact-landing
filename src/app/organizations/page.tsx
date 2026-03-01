"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  organizations,
  getUniqueRegions,
  type Organization,
} from "@/data/organizations";
import BusanDistrictMap from "@/components/BusanDistrictMap";

const regionColors: Record<string, string> = {
  사상구: "bg-violet-50 text-violet-700 border-violet-200",
  강서구: "bg-emerald-50 text-emerald-700 border-emerald-200",
  연제구: "bg-amber-50 text-amber-700 border-amber-200",
  부산진구: "bg-sky-50 text-sky-700 border-sky-200",
  동래구: "bg-rose-50 text-rose-700 border-rose-200",
  북구: "bg-teal-50 text-teal-700 border-teal-200",
  기장군: "bg-indigo-50 text-indigo-700 border-indigo-200",
  사하구: "bg-orange-50 text-orange-700 border-orange-200",
  해운대구: "bg-cyan-50 text-cyan-700 border-cyan-200",
  금정구: "bg-pink-50 text-pink-700 border-pink-200",
};

function getRegionColor(region: string) {
  const short = region.replace("부산광역시 ", "");
  return regionColors[short] || "bg-slate-50 text-slate-700 border-slate-200";
}

function OrgCard({
  org,
  isExpanded,
  onToggle,
}: {
  org: Organization;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const shortRegion = org.region.replace("부산광역시 ", "");

  return (
    <div
      id={`org-${org.id}`}
      className={`bg-white border rounded-2xl transition-all duration-300 scroll-mt-24 ${
        isExpanded
          ? "border-primary/40 shadow-lg shadow-primary/5"
          : "border-slate-200 hover:border-primary/20 hover:shadow-md"
      }`}
    >
      {/* Card Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-5 md:p-7 focus:outline-none"
      >
        <div className="flex items-center gap-5 md:gap-6">
          {/* Profile Image */}
          <div className="shrink-0 relative">
            <div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 transition-colors ${
                isExpanded ? "border-primary" : "border-slate-200"
              }`}
            >
              <Image
                src={org.profileImage}
                alt={`${org.name} 대표`}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] shadow-sm ${
                isExpanded
                  ? "bg-primary text-white"
                  : "bg-primary/10 text-primary border border-primary/20"
              } transition-colors`}
            >
              {String(org.id).padStart(2, "0")}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-lg font-bold text-slate-900">{org.name}</h3>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getRegionColor(
                  org.region
                )}`}
              >
                {shortRegion}
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
              {org.description}
            </p>

            {/* Members */}
            <div className="flex flex-wrap gap-2 mt-2.5">
              {org.members.map((member) => (
                <span
                  key={member}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full"
                >
                  <span className="material-symbols-outlined text-xs">
                    person
                  </span>
                  {member}
                </span>
              ))}
            </div>
          </div>

          {/* Toggle icon */}
          <span
            className={`material-symbols-outlined text-slate-400 transition-transform duration-300 shrink-0 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            expand_more
          </span>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-5 md:px-7 pb-7">
          <div className="border-t border-slate-100 pt-6">
            {/* Profile + Commitment section */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Large profile image */}
              <div className="shrink-0 md:w-56">
                <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <Image
                    src={org.profileImage}
                    alt={`${org.name} 대표 프로필`}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  {org.members.map((member) => (
                    <p key={member} className="text-sm font-semibold text-slate-700">
                      {member}
                    </p>
                  ))}
                </div>
              </div>

              {/* Commitment */}
              <div className="flex-1">
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4">
                  <span className="material-symbols-outlined text-primary text-lg">
                    favorite
                  </span>
                  참여 다짐
                </h4>
                <div className="relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/10">
                  <span className="material-symbols-outlined text-primary/15 text-6xl absolute top-3 right-4">
                    format_quote
                  </span>
                  <p className="text-[15px] text-slate-700 leading-relaxed relative z-10 italic">
                    &ldquo;{org.commitment}&rdquo;
                  </p>
                </div>

                {/* Activities inline */}
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mt-6 mb-4">
                  <span className="material-symbols-outlined text-primary text-lg">
                    checklist
                  </span>
                  주요 활동 및 특성
                </h4>
                <ul className="space-y-2.5">
                  {org.activities.map((activity, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="material-symbols-outlined text-primary text-base mt-0.5 shrink-0">
                        check_circle
                      </span>
                      <span className="text-sm text-slate-600 leading-relaxed">
                        {activity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrganizationsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const regions = getUniqueRegions();

  const filteredOrgs = organizations.filter((org) => {
    const matchesRegion =
      selectedRegion === "전체" ||
      org.region.includes(selectedRegion);
    const matchesSearch =
      searchQuery === "" ||
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.activities.some((a) =>
        a.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesRegion && matchesSearch;
  });

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleRegionSelect = useCallback((region: string) => {
    setSelectedRegion(region);
    // 지도 아래 기관 리스트로 스크롤
    const listSection = document.getElementById("org-list");
    if (listSection) {
      listSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-[#3a0870] text-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <span className="material-symbols-outlined text-base">
              arrow_back
            </span>
            메인으로 돌아가기
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-semibold mb-6">
              <span className="material-symbols-outlined text-base">
                groups
              </span>
              {organizations.length}개 참여기관
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
              참여기관 소개
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
              부산 지역 아동·청소년의 건강한 성장을 위해 함께하는 전문기관들을
              소개합니다. 각 기관의 전문 분야와 활동, 그리고 B-IMPACT Alliance에
              대한 다짐을 확인해 보세요.
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold">
                {organizations.length}
              </p>
              <p className="text-xs text-white/60 mt-1">참여기관</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold">{regions.length}</p>
              <p className="text-xs text-white/60 mt-1">자치구</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold">
                {organizations.reduce(
                  (acc, org) => acc + org.members.length,
                  0
                )}
                +
              </p>
              <p className="text-xs text-white/60 mt-1">전문가</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold">
                {organizations.reduce(
                  (acc, org) => acc + org.activities.length,
                  0
                )}
                +
              </p>
              <p className="text-xs text-white/60 mt-1">서비스 활동</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="sticky top-[65px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-4">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Region Filters */}
            <div className="flex flex-wrap gap-2 flex-1">
              <button
                onClick={() => setSelectedRegion("전체")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  selectedRegion === "전체"
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                전체 ({organizations.length})
              </button>
              {regions.map((region) => {
                const count = organizations.filter((o) =>
                  o.region.includes(region)
                ).length;
                return (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedRegion === region
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {region} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                search
              </span>
              <input
                type="text"
                placeholder="기관명, 활동 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* District Map Section */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-4">
              <span className="material-symbols-outlined text-sm">map</span>
              DISTRICT MAP
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              지역별 참여 현황
            </h2>
            <p className="text-slate-500 text-sm">
              부산 전역 {regions.length}개 자치구에서 아동·청소년의 심리지원을
              위해 함께하고 있습니다. 마커를 클릭하여 각 지역의 기관을 확인하세요.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6 h-[400px] md:h-[500px] lg:h-[540px]">
            {/* 지도 */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <BusanDistrictMap
                organizations={organizations}
                selectedRegion={selectedRegion}
                onRegionSelect={handleRegionSelect}
              />
            </div>

            {/* 지역 통계 사이드바 */}
            <div className="hidden lg:flex flex-col gap-3 min-h-0">
              <button
                onClick={() => handleRegionSelect("전체")}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all shrink-0 ${
                  selectedRegion === "전체"
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-slate-200 hover:border-primary/30 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg">
                    public
                  </span>
                  <span className="font-bold text-sm">전체 지역</span>
                </div>
                <span className="font-extrabold text-lg">
                  {organizations.length}
                </span>
              </button>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0 scrollbar-thin">
                {regions.map((region) => {
                  const orgsInRegion = organizations.filter((o) =>
                    o.region.includes(region)
                  );
                  const isActive = selectedRegion === region;
                  return (
                    <button
                      key={region}
                      onClick={() => handleRegionSelect(region)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                        isActive
                          ? "bg-primary/5 border-primary/30 shadow-sm"
                          : "bg-white border-slate-200 hover:border-primary/20 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className="material-symbols-outlined text-base"
                          style={{
                            color: isActive ? "#7317cf" : "#94a3b8",
                          }}
                        >
                          location_on
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`font-bold text-sm ${
                              isActive ? "text-primary" : "text-slate-700"
                            }`}
                          >
                            {region}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {orgsInRegion.map((o) => o.name).join(", ")}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-sm ${
                          isActive
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {orgsInRegion.length}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization List */}
      <section id="org-list" className="py-10 md:py-16 bg-slate-50/80 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500">
              {filteredOrgs.length === organizations.length ? (
                <>
                  전체 <strong className="text-slate-700">{filteredOrgs.length}</strong>개 기관
                </>
              ) : (
                <>
                  검색 결과{" "}
                  <strong className="text-slate-700">{filteredOrgs.length}</strong>개 기관
                </>
              )}
            </p>
            {expandedId !== null && (
              <button
                onClick={() => setExpandedId(null)}
                className="text-sm text-primary font-medium hover:underline"
              >
                모두 접기
              </button>
            )}
          </div>

          {/* Cards */}
          {filteredOrgs.length > 0 ? (
            <div className="space-y-4">
              {filteredOrgs.map((org) => (
                <OrgCard
                  key={org.id}
                  org={org}
                  isExpanded={expandedId === org.id}
                  onToggle={() => handleToggle(org.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">
                search_off
              </span>
              <p className="text-slate-500 text-lg font-medium">
                검색 결과가 없습니다.
              </p>
              <p className="text-slate-400 text-sm mt-1">
                다른 검색어나 지역 필터를 시도해 보세요.
              </p>
              <button
                onClick={() => {
                  setSelectedRegion("전체");
                  setSearchQuery("");
                }}
                className="mt-4 text-primary font-semibold text-sm hover:underline"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="bg-gradient-to-br from-primary via-primary to-primary-dark rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                우리 기관도 함께하고 싶으신가요?
              </h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                B-IMPACT Alliance는 부산 지역 아동·청소년 심리지원에 뜻을 함께하는
                기관의 참여를 환영합니다.
              </p>
              <a
                href="mailto:info@b-impact.kr"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
              >
                참여 문의하기
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
