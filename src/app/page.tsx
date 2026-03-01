import Link from "next/link";
import Image from "next/image";
import { organizations, getUniqueRegions } from "@/data/organizations";

export default function Home() {
  const totalOrgs = organizations.length;
  const totalRegions = getUniqueRegions().length;
  const totalMembers = organizations.reduce(
    (acc, org) => acc + org.members.length,
    0
  );

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#3a0870] text-white">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-36">
          <div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-semibold mb-8">
                <span className="material-symbols-outlined text-base">
                  diversity_3
                </span>
                부산 아동 청소년 심리지원 네트워크
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.15] mb-6 tracking-tight">
                공공성을 넘어
                <br />
                <span className="text-white/80">지속 가능성으로</span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
                비영리 섹터 AX를 선도하는{" "}
                <strong className="text-white">B-IMPACT Alliance</strong>는 부산
                지역 아동·청소년의 건강한 성장을 위해 심리지원 전문기관들이
                연대하는 협력 네트워크입니다.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/organizations"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
                >
                  참여기관 보기
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="#about"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                >
                  더 알아보기
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <p className="text-3xl md:text-4xl font-extrabold">{totalOrgs}</p>
                  <p className="text-sm text-white/60 mt-1">참여기관</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-extrabold">
                    {totalRegions}
                  </p>
                  <p className="text-sm text-white/60 mt-1">부산 내 자치구</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-extrabold">
                    {totalMembers}+
                  </p>
                  <p className="text-sm text-white/60 mt-1">전문가</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-6">
                <span className="material-symbols-outlined text-sm">
                  visibility
                </span>
                VISION & MISSION
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-slate-900">
                아이들의 마음을 잇는
                <br />
                <span className="text-primary">연대의 힘</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                B-IMPACT Alliance는 부산 지역의 심리상담, 언어치료, 발달재활,
                미술치료 등 다양한 전문 기관들이 모여 아동·청소년의 심리적
                안정과 건강한 성장을 함께 지원하는 협력 네트워크입니다.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start border-l-4 border-primary pl-5">
                  <div>
                    <p className="text-slate-900 font-bold mb-1">
                      비전: 지속 가능한 심리지원 생태계
                    </p>
                    <p className="text-slate-500 text-sm">
                      개별 기관의 경계를 넘어 하나의 공동체로서 아이들의 성장을
                      함께 고민하고 지원합니다.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start border-l-4 border-primary/40 pl-5">
                  <div>
                    <p className="text-slate-900 font-bold mb-1">
                      미션: 비영리 섹터의 AI 전환(AX)
                    </p>
                    <p className="text-slate-500 text-sm">
                      AI와 디지털 기술을 활용하여 심리지원 서비스의 질을
                      혁신하고, 공공성과 전문성을 동시에 강화합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 flex items-center justify-center">
                <div className="text-center px-8">
                  <span className="material-symbols-outlined text-8xl text-primary/30 mb-4">
                    psychology
                  </span>
                  <p className="text-slate-400 text-sm font-medium">
                    아동·청소년 심리지원의 새로운 패러다임
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-5 rounded-xl shadow-xl hidden lg:block">
                <p className="text-2xl font-extrabold">{totalOrgs}개</p>
                <p className="text-sm text-white/80">참여기관</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CORE VALUES ============ */}
      <section id="values" className="py-20 bg-slate-50/80">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold mb-3 text-slate-900">
              핵심 가치
            </h2>
            <p className="text-slate-500">
              B-IMPACT Alliance가 지향하는 세 가지 핵심 원칙입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-3xl">
                  shield
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">공공성</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                사회서비스의 품질과 접근성을 높여 모든 아동·청소년이 필요한
                심리지원을 받을 수 있도록 합니다.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-3xl">
                  workspace_premium
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">전문성</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                각 분야 전문가들의 협업과 공동연구를 통해 근거 기반의 체계적인
                심리지원 서비스를 제공합니다.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-3xl">
                  eco
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                지속가능성
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                AI와 디지털 전환을 통해 비영리 섹터의 운영 효율을 높이고,
                지속 가능한 심리지원 생태계를 구축합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ORGANIZATIONS PREVIEW ============ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-4">
              <span className="material-symbols-outlined text-sm">groups</span>
              PARTNER ORGANIZATIONS
            </div>
            <h2 className="text-3xl font-extrabold mb-3 text-slate-900">
              함께하는 기관들
            </h2>
            <p className="text-slate-500">
              부산 전역 {totalRegions}개 자치구에서 {totalOrgs}개 전문기관이
              아동·청소년의 건강한 성장을 위해 연대하고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {organizations.slice(0, 6).map((org) => (
              <Link
                key={org.id}
                href={`/organizations#org-${org.id}`}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all block group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 group-hover:border-primary/30 transition-colors">
                    <Image
                      src={org.profileImage}
                      alt={`${org.name} 대표`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 truncate">
                      {org.name}
                    </h3>
                    <span className="text-xs font-semibold text-slate-400">
                      {org.region.replace("부산광역시 ", "")}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">
                  {org.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="material-symbols-outlined text-sm">
                    person
                  </span>
                  {org.members.join(", ")}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/organizations"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-lg"
            >
              전체 {totalOrgs}개 기관 보기
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="bg-gradient-to-br from-primary via-primary to-primary-dark rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                함께하는 연대에 동참하세요
              </h2>
              <p className="text-white/80 mb-10 text-lg max-w-xl mx-auto">
                부산 지역 아동·청소년의 건강한 성장을 위한 심리지원 네트워크에
                관심이 있는 기관의 참여를 환영합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@b-impact.kr"
                  className="px-10 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
                >
                  문의하기
                </a>
                <Link
                  href="/organizations"
                  className="px-10 py-4 bg-transparent border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                >
                  참여기관 둘러보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
