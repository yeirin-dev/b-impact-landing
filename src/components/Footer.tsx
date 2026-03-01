import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-12" itemScope itemType="https://schema.org/Organization">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="B-IMPACT Alliance"
                width={128}
                height={128}
                className="h-8 w-8 object-contain"
                itemProp="logo"
              />
              <span className="text-lg font-extrabold tracking-tight" itemProp="name">
                B-IMPACT <span className="text-primary">Alliance</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed" itemProp="description">
              부산 아동·청소년 심리지원 네트워크
              <br />
              공공성을 넘어 지속 가능성으로, 비영리 섹터 AX를 선도합니다.
            </p>
            <meta itemProp="url" content="https://b-impact.yeirin.com" />
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h6 className="font-bold text-sm mb-4 text-slate-900">
                얼라이언스
              </h6>
              <ul className="text-sm text-slate-500 space-y-2.5">
                <li>
                  <Link href="/#about" className="hover:text-primary transition-colors">
                    소개
                  </Link>
                </li>
                <li>
                  <Link href="/#values" className="hover:text-primary transition-colors">
                    핵심가치
                  </Link>
                </li>
                <li>
                  <Link href="/organizations" className="hover:text-primary transition-colors">
                    참여기관
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-bold text-sm mb-4 text-slate-900">지원</h6>
              <ul className="text-sm text-slate-500 space-y-2.5">
                <li>
                  <Link href="/#contact" className="hover:text-primary transition-colors">
                    문의하기
                  </Link>
                </li>
                <li>
                  <span className="cursor-default">FAQ</span>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h6 className="font-bold text-sm mb-4 text-slate-900">연락처</h6>
              <ul className="text-sm text-slate-500 space-y-2.5">
                <li itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="addressRegion">부산광역시</span>
                </li>
                <li>
                  <a href="mailto:info@b-impact.kr" className="hover:text-primary transition-colors" itemProp="email">
                    info@b-impact.kr
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; 2025 B-IMPACT Alliance. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-slate-400 hover:text-primary cursor-pointer transition-colors">
              이용약관
            </span>
            <span className="text-xs text-slate-500 font-bold hover:text-primary cursor-pointer transition-colors">
              개인정보처리방침
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
