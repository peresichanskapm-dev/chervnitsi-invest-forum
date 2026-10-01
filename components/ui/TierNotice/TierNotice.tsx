import { LeadLink } from "@/components/ui/LeadLink/LeadLink";

import styles from "./TierNotice.module.scss";

type TierNoticeProps = {
  label: string;
  cta: string;
  href: string;
  formSource: string;
};

export function TierNotice({ label, cta, href, formSource }: TierNoticeProps) {
  return (
    <div className={styles.notice}>
      <p className={styles.label}>{label}</p>
      <LeadLink className={styles.cta} href={href} formSource={formSource}>
        {cta}
      </LeadLink>
    </div>
  );
}
