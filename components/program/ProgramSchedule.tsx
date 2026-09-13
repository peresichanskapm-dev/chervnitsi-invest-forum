"use client";

import { Fragment, type CSSProperties, type ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  getDefaultProgramKey,
  getProgramKey,
  getStagesForDay,
  PROGRAM_DICTIONARY,
  type ProgramDay,
  type ProgramEntry,
  type ProgramKey,
  type ProgramListBlock,
  type ProgramSpeaker,
  type ProgramStage,
  type SideEventCell,
  type SideEventRow,
} from "./data";
import styles from "./ProgramSchedule.module.scss";

type Props = {
  afterContent?: (activeKey: ProgramKey) => ReactNode;
};

const HOME_HREF = "/";

function getDayFromKey(key: ProgramKey): ProgramDay {
  return key.startsWith("day2") ? "day2" : "day1";
}

function getStageFromKey(key: ProgramKey): ProgramStage {
  if (key.endsWith("side")) return "side";
  if (key.endsWith("vyzhnytsia")) return "vyzhnytsia";
  if (key.endsWith("chnu")) return "chnu";
  return "main";
}

function renderWithBreaks(text: string): ReactNode {
  return text
    .split(/<br\s*\/?>/gi)
    .flatMap((part, index, parts) => (index < parts.length - 1 ? [part, <br key={`${part}-${index}`} />] : [part]));
}

function Speaker({ speaker }: { speaker: ProgramSpeaker }) {
  return (
    <div className={styles.speaker}>
      {speaker.role ? <p className={styles.speakerRole}>{renderWithBreaks(speaker.role)}</p> : null}
      <p className={styles.speakerName}>{renderWithBreaks(speaker.name)}</p>
      {speaker.description ? <p className={styles.speakerDescription}>{renderWithBreaks(speaker.description)}</p> : null}
    </div>
  );
}

function SpeakerList({ speakers }: { speakers: ProgramSpeaker[] }) {
  return (
    <div className={styles.speakers}>
      {speakers.map((speaker, index) => (
        <Speaker speaker={speaker} key={`${speaker.name}-${index}`} />
      ))}
    </div>
  );
}

function getHeightStyle(height?: number): CSSProperties | undefined {
  return height ? ({ "--block-height": `${height / 10}rem` } as CSSProperties) : undefined;
}

function ProgramEntryView({ entry, pendingLabel, height }: { entry: ProgramEntry; pendingLabel: string; height?: number }) {
  return (
    <article className={styles.entry} style={getHeightStyle(height)}>
      <div className={styles.entryContent}>
        {entry.time ? <p className={styles.entryTime}>{entry.time}</p> : null}
        {entry.type ? <p className={styles.entryType}>{entry.type}</p> : null}
        {entry.title ? <h2 className={styles.entryTitle}>{renderWithBreaks(entry.title)}</h2> : null}
        {entry.bullets?.length ? (
          <ul className={styles.bullets}>
            {entry.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className={styles.entrySpeakers}>
        {entry.speakersPending ? <p className={styles.pending}>{pendingLabel}</p> : null}
        {entry.speakers?.length ? <SpeakerList speakers={entry.speakers} /> : null}
      </div>
    </article>
  );
}

function ProgramBar({ block, index }: { block: Extract<ProgramListBlock, { kind: "bar" }>; index: number }) {
  const style = {
    ...getHeightStyle(block.height),
    ...(block.marginBottom ? { marginBottom: `${block.marginBottom / 10}rem` } : undefined),
    ...(block.marginTop ? { marginTop: `${block.marginTop / 10}rem` } : undefined),
  };
  return (
    <div className={`${styles.bar} ${block.tone === "accent" ? styles.accentBar : styles.darkBar}`} key={`${block.label}-${index}`} style={style}>
      {block.time ? <span className={styles.barTime}>{block.time}</span> : null}
      {block.label}
    </div>
  );
}

function ProgramPlate({ block }: { block: Extract<ProgramListBlock, { kind: "plate" }> }) {
  return (
    <div className={styles.plate}>
      <p className={styles.plateText}>
        <span className={styles.plateAccent}>{block.title}</span> {block.subtitle}
      </p>
      <div className={styles.plateDecor} aria-hidden>
        <img className={styles.plateDecorImage} src="/images/program/plate-checker-1.svg" alt="" />
        <img className={styles.plateDecorImage} src="/images/program/plate-checker-2.svg" alt="" />
      </div>
    </div>
  );
}

function SideCell({ cell }: { cell: SideEventCell | null }) {
  if (!cell) {
    return <div className={`${styles.sideCell} ${styles.emptyCell}`} aria-hidden />;
  }

  return (
    <div className={styles.sideCell}>
      <h3 className={styles.sideTitle}>{cell.title}</h3>
      {cell.subtitle ? <p className={styles.sideSubtitle}>{cell.subtitle}</p> : null}
      {cell.speakers?.length ? <SpeakerList speakers={cell.speakers} /> : null}
    </div>
  );
}

function getSideRowStyle(rowIndex: number, columnIndex: number, cell?: SideEventCell | null): CSSProperties {
  return {
    gridColumn: `${columnIndex + 2} / span ${cell?.colSpan ?? 1}`,
    gridRow: `${rowIndex + 2} / span ${cell?.rowSpan ?? 1}`,
  } as CSSProperties;
}

function getSideTimeStyle(rowIndex: number): CSSProperties {
  return { gridColumn: "1", gridRow: `${rowIndex + 2}` } as CSSProperties;
}

function isSideCellCovered(rows: SideEventRow[], rowIndex: number, columnIndex: number) {
  for (let previousRowIndex = rowIndex - 1; previousRowIndex >= 0; previousRowIndex -= 1) {
    const previousCell = rows[previousRowIndex]?.cells[columnIndex];
    const rowSpan = previousCell?.rowSpan ?? 1;

    if (previousCell && rowSpan > rowIndex - previousRowIndex) {
      return true;
    }
  }

  return false;
}

export function ProgramSchedule({ afterContent }: Props) {
  const dictionary = PROGRAM_DICTIONARY;
  const defaultKey = getDefaultProgramKey();
  const [activeKey, setActiveKey] = useState<ProgramKey>(defaultKey);
  const [selectedDay, setSelectedDay] = useState<ProgramDay>(getDayFromKey(defaultKey));
  const [selectedStage, setSelectedStage] = useState<ProgramStage>(getStageFromKey(defaultKey));
  const [openSelect, setOpenSelect] = useState<"day" | "stage" | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const activeVariant = dictionary.variants[activeKey];
  const stagesForDay = useMemo(() => getStagesForDay(selectedDay), [selectedDay]);
  const dayOptions = Object.keys(dictionary.days) as ProgramDay[];
  const sideProgram =
    activeVariant.sideColumns && activeVariant.sideRows
      ? { columns: activeVariant.sideColumns, rows: activeVariant.sideRows }
      : null;
  const sideGridRows = sideProgram
    ? `6.2rem ${sideProgram.rows.map((row) => `minmax(${(row.height ?? 184) / 10}rem, auto)`).join(" ")}`
    : undefined;

  useEffect(() => {
    if (!openSelect) return undefined;

    const closeOnOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!filtersRef.current?.contains(event.target as Node)) {
        setOpenSelect(null);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenSelect(null);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("touchstart", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("touchstart", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [openSelect]);

  const updateSelectedDay = (day: ProgramDay) => {
    const nextStages = getStagesForDay(day);
    const nextStage = nextStages.includes(selectedStage) ? selectedStage : nextStages[0];
    setSelectedDay(day);
    setSelectedStage(nextStage);
    setActiveKey(getProgramKey(day, nextStage));
    setOpenSelect(null);
  };

  const updateSelectedStage = (stage: ProgramStage) => {
    setSelectedStage(stage);
    setActiveKey(getProgramKey(selectedDay, stage));
    setOpenSelect(null);
  };

  return (
    <section className={styles.section} aria-label={dictionary.breadcrumbCurrent}>
      <div className={`container ${styles.container}`}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <a href={HOME_HREF}>{dictionary.breadcrumbHome}</a>
          <span>/</span>
          <span>{dictionary.breadcrumbCurrent}</span>
        </nav>

        <div className={styles.filters} ref={filtersRef}>
          <div className={styles.field}>
            <p className={styles.fieldLabel}>{dictionary.dayLabel}</p>
            <div className={styles.selectList}>
              <button
                type="button"
                className={`${styles.option} ${openSelect === "day" ? styles.optionActive : ""}`}
                onClick={() => setOpenSelect((current) => (current === "day" ? null : "day"))}
                aria-expanded={openSelect === "day"}
                aria-haspopup="listbox"
              >
                {dictionary.days[selectedDay]}
                <span className={`${styles.chevron} ${openSelect === "day" ? styles.chevronOpen : ""}`} aria-hidden />
              </button>
              {openSelect === "day"
                ? dayOptions
                    .filter((day) => day !== selectedDay)
                    .map((day) => (
                      <button type="button" className={styles.option} onClick={() => updateSelectedDay(day)} key={day} role="option" aria-selected={false}>
                        {dictionary.days[day]}
                      </button>
                    ))
                : null}
            </div>
          </div>
          <div className={styles.field}>
            <p className={styles.fieldLabel}>{dictionary.stageLabel}</p>
            <div className={styles.selectList}>
              <button
                type="button"
                className={`${styles.option} ${openSelect === "stage" ? styles.optionActive : ""}`}
                onClick={() => setOpenSelect((current) => (current === "stage" ? null : "stage"))}
                aria-expanded={openSelect === "stage"}
                aria-haspopup="listbox"
              >
                {dictionary.stages[selectedStage]}
                <span className={`${styles.chevron} ${openSelect === "stage" ? styles.chevronOpen : ""}`} aria-hidden />
              </button>
              {openSelect === "stage"
                ? stagesForDay
                    .filter((stage) => stage !== selectedStage)
                    .map((stage) => (
                      <button type="button" className={styles.option} onClick={() => updateSelectedStage(stage)} key={stage} role="option" aria-selected={false}>
                        {dictionary.stages[stage]}
                      </button>
                    ))
                : null}
            </div>
          </div>
        </div>

        {activeVariant.tags.length > 0 && (
          <div className={styles.tags}>
            {activeVariant.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}

        <div className={styles.program}>
          <div className={styles.programContent}>
            {activeVariant.blocks?.map((block, index) => {
              if (block.kind === "bar") {
                return <ProgramBar block={block} index={index} key={`${block.label}-${index}`} />;
              }
              if (block.kind === "plate") {
                return <ProgramPlate block={block} key={`${block.title}-${index}`} />;
              }
              return (
                <ProgramEntryView
                  entry={block.entry}
                  pendingLabel={dictionary.pendingSpeakers}
                  height={block.height}
                  key={`${block.entry.title ?? block.entry.type ?? "entry"}-${index}`}
                />
              );
            })}

            {sideProgram ? (
              <div className={styles.sideScroller}>
                <div
                  className={styles.sideGrid}
                  style={{ "--side-columns": sideProgram.columns.length, gridTemplateRows: sideGridRows } as CSSProperties}
                >
                  {sideProgram.columns.map((column, columnIndex) => (
                    <div
                      className={`${styles.sideHeader} ${columnIndex === 0 ? styles.firstSideColumn : ""}`}
                      key={column}
                      style={{ gridColumn: `${columnIndex + 2}`, gridRow: "1" }}
                    >
                      {column}
                    </div>
                  ))}
                  {sideProgram.rows.map((row, rowIndex) => (
                    <Fragment key={`${row.time}-${rowIndex}`}>
                      <div className={`${styles.sideTime} ${rowIndex === 0 ? styles.firstSideTime : ""}`} style={getSideTimeStyle(rowIndex)}>
                        {row.time}
                      </div>
                      {row.afterparty ? (
                        <div className={styles.afterparty} style={{ gridColumn: `2 / span ${sideProgram.columns.length}`, gridRow: `${rowIndex + 2}` }}>
                          {row.afterparty}
                        </div>
                      ) : (
                        sideProgram.columns.map((column, columnIndex) =>
                          isSideCellCovered(sideProgram.rows, rowIndex, columnIndex) ? null : (
                            <div className={styles.sideCellSlot} style={getSideRowStyle(rowIndex, columnIndex, row.cells[columnIndex])} key={`${row.time}-${column}`}>
                              <SideCell cell={row.cells[columnIndex] ?? null} />
                            </div>
                          ),
                        )
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className={styles.programGlow} aria-hidden />

        {afterContent ? afterContent(activeKey) : null}
      </div>
    </section>
  );
}
