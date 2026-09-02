import { useTranslation } from "@orderly.network/i18n";
import { getPageMeta } from "@/utils/seo";
import { renderSEOTags } from "@/utils/seo-tags";
import { generatePageTitle } from "@/utils/utils";
import "./mer-vip.css";

const vipTiers = [
  { level: 1, volume: "1M U", taker: "0.050%", maker: "0.015%" },
  { level: 2, volume: "5M U", taker: "0.045%", maker: "0.012%" },
  { level: 3, volume: "20M U", taker: "0.038%", maker: "0.008%" },
  { level: 4, volume: "200M U", taker: "0.032%", maker: "-0.0003%" },
  { level: 5, volume: "270M U", taker: "0.028%", maker: "-0.0007%" },
  { level: 6, volume: "760M U", taker: "0.024%", maker: "-0.0015%" },
] as const;

const tierStyles = [
  "bronze",
  "silver",
  "gold",
  "diamond",
  "master",
  "crown",
] as const;

export default function MerVipIndex() {
  const { t } = useTranslation();
  const pageMeta = getPageMeta();
  const pageTitle = generatePageTitle(t("extend.merVip.navigation"));

  return (
    <>
      {renderSEOTags(pageMeta, pageTitle)}
      <main className="mer-vip-page oui-mx-auto oui-w-full oui-max-w-[1120px] oui-px-4 oui-py-8 md:oui-px-6 md:oui-py-12">
        <section className="mer-vip-card">
          <div className="mer-vip-card__glow" aria-hidden="true" />
          <header className="mer-vip-header">
            <h1 className="mer-vip-title oui-text-2xl oui-font-bold md:oui-text-4xl">
              {t("extend.merVip.title")}
            </h1>
            <div className="mer-vip-header__line" aria-hidden="true" />
          </header>

          <div className="mer-vip-table-frame">
            <div className="oui-overflow-x-auto">
              <table className="mer-vip-table oui-w-full oui-min-w-[680px] oui-border-collapse oui-text-left">
                <thead>
                  <tr>
                    <th className="mer-vip-level-column oui-px-5 oui-py-4 oui-text-sm md:oui-px-8">
                      {t("extend.merVip.level")}
                    </th>
                    <th className="oui-px-5 oui-py-4 oui-text-sm oui-font-semibold md:oui-px-8">
                      <span className="oui-block">
                        {t("extend.merVip.volumeThreshold")}
                      </span>
                      <span className="oui-mt-1 oui-block oui-text-xs oui-font-normal oui-opacity-60">
                        ({t("extend.merVip.volumePeriod")})
                      </span>
                    </th>
                    <th className="oui-px-5 oui-py-4 oui-text-right oui-text-sm oui-font-semibold md:oui-px-8">
                      {t("extend.merVip.takerFee")}
                    </th>
                    <th className="oui-px-5 oui-py-4 oui-text-right oui-text-sm oui-font-semibold md:oui-px-8">
                      {t("extend.merVip.makerFee")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vipTiers.map((tier) => {
                    const hasRebate = tier.maker.startsWith("-");
                    return (
                      <tr key={tier.level}>
                        <td className="mer-vip-level-column oui-px-5 oui-py-5 md:oui-px-8">
                          <div className="oui-flex oui-items-center oui-gap-3">
                            <span
                              aria-hidden="true"
                              className={`vip-emblem vip-emblem--${tierStyles[tier.level - 1]}`}
                            >
                              <span>{tier.level}</span>
                            </span>
                            <span>VIP {tier.level}</span>
                          </div>
                        </td>
                        <td className="oui-px-5 oui-py-5 oui-font-semibold md:oui-px-8">
                          {tier.volume}
                        </td>
                        <td className="oui-px-5 oui-py-5 oui-text-right oui-font-medium oui-tabular-nums md:oui-px-8">
                          {tier.taker}
                        </td>
                        <td className="oui-px-5 oui-py-5 oui-text-right oui-font-semibold oui-tabular-nums md:oui-px-8">
                          <span
                            className={hasRebate ? "mer-vip-rebate" : undefined}
                          >
                            {tier.maker}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
