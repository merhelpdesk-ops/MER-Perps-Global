import { useEffect, useRef } from "react";
import { GeneralLeaderboardWidget } from "@orderly.network/trading-leaderboard";
import { getPageMeta } from "@/utils/seo";
import { renderSEOTags } from "@/utils/seo-tags";
import { generatePageTitle } from "@/utils/utils";

const ORDERLY_DASHBOARD_LINK =
  'a[href^="https://orderly-dashboard.orderly.network/"]';

export default function LeaderboardIndex() {
  const leaderboardRef = useRef<HTMLDivElement>(null);
  const pageMeta = getPageMeta();
  const pageTitle = generatePageTitle("Leaderboard");

  useEffect(() => {
    const leaderboard = leaderboardRef.current;
    if (!leaderboard) return;

    const removeDashboardLinks = () => {
      leaderboard
        .querySelectorAll<HTMLAnchorElement>(ORDERLY_DASHBOARD_LINK)
        .forEach((link) => link.removeAttribute("href"));
    };

    removeDashboardLinks();

    const observer = new MutationObserver(removeDashboardLinks);
    observer.observe(leaderboard, {
      attributes: true,
      attributeFilter: ["href"],
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {renderSEOTags(pageMeta, pageTitle)}
      <div
        ref={leaderboardRef}
        className="oui-py-6 oui-px-4 lg:oui-px-6 xl:oui-pl-4 lx:oui-pr-6"
      >
        <GeneralLeaderboardWidget />
      </div>
    </>
  );
}
