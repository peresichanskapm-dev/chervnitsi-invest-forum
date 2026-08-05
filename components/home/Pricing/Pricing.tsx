import type { CSSProperties } from "react";

import { ScrollArea } from "@/components/ui/DragScrollbar/ScrollArea";
import { PRICING_COLUMNS, getPricingRows } from "@/lib/pricingSchedule";

import { pricingData } from "./Pricing.data";
import styles from "./Pricing.module.scss";

type Props = {
  dateKey: string;
};

export function Pricing({ dateKey }: Props) {
  const rows = getPricingRows(dateKey);
  const tableStyle = {
    "--pricing-column-count": PRICING_COLUMNS.length,
  } as CSSProperties;

  return (
    <section className={styles.section} id="pricing">
      <h2 className={styles.title} data-reveal="fade">
        {pricingData.title}
      </h2>

      <div className={`container ${styles.container}`}>
        <div className={styles.tableBlock} data-reveal="">
          <ScrollArea className={styles.tableWrap} scrollbarClassName={styles.scrollbar}>
            <div
              className={styles.table}
              role="table"
              aria-label={pricingData.tableAriaLabel}
              style={tableStyle}
            >
              <div className={styles.headRow} role="row">
                <div className={styles.corner} role="columnheader" aria-hidden="true" />
                {PRICING_COLUMNS.map((column) => (
                  <div key={column.tierId} className={styles.headCell} role="columnheader">
                    {column.label}
                  </div>
                ))}
              </div>

              {rows.map((row, index) => (
                <div
                  key={row.id}
                  className={`${styles.row} ${row.highlight ? styles.highlight : ""} ${row.blur ? styles.blur : ""}`}
                  role="row"
                  aria-current={row.isActive ? "true" : undefined}
                  style={{ "--row-index": index } as CSSProperties}
                >
                  <div className={styles.rowLabel} role="rowheader">
                    <span className={styles.phase}>{row.phase}</span>
                    <span className={styles.date}>{row.date}</span>
                  </div>
                  {row.values.map((value, index) => (
                    <div key={PRICING_COLUMNS[index].tierId} className={styles.cell} role="cell">
                      {value}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className={styles.scrollFade} aria-hidden="true" />
        </div>
        <p className={styles.scrollHint} aria-hidden="true">
          гортай →
        </p>
      </div>
    </section>
  );
}
