import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { create, props } from "@stylexjs/stylex";
import { useCallback, useMemo, useState } from "react";
import { trackVisit, updateStarOrder } from "../lib/mutations";
import type { BookmarkRow } from "../lib/queries";
import { colors, fonts, fontSizes, spacing } from "../lib/Tokens.stylex";

interface StarredShortcutsProps {
  bookmarks: readonly BookmarkRow[];
}

function truncateTitle(title: string | null, maxWords: number): string {
  const text = title || "Untitled";
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

function SortableTile({ bookmark }: { bookmark: BookmarkRow }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: bookmark.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleClick = useCallback(() => {
    if (bookmark.url) {
      trackVisit(bookmark.id, bookmark.visitCount);
      window.open(bookmark.url, "_blank", "noopener");
    }
  }, [bookmark.id, bookmark.url, bookmark.visitCount]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      {...props(styles.tile)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {bookmark.favicon && (
        <img
          src={bookmark.favicon}
          alt=""
          width={16}
          height={16}
          {...props(styles.favicon)}
        />
      )}
      <span {...props(styles.tileTitle)}>
        {truncateTitle(bookmark.title, 3)}
      </span>
    </div>
  );
}

export function StarredShortcuts({ bookmarks }: StarredShortcutsProps) {
  const starred = useMemo(
    () =>
      bookmarks
        .filter((b) => b.isStarred === 1)
        .slice()
        .sort((a, b) => {
          const aOrder = a.starOrder ?? Number.MAX_SAFE_INTEGER;
          const bOrder = b.starOrder ?? Number.MAX_SAFE_INTEGER;
          return aOrder - bOrder;
        }),
    [bookmarks],
  );

  const [orderedIds, setOrderedIds] = useState<string[]>([]);

  // Keep orderedIds in sync with starred bookmarks
  const displayItems = useMemo(() => {
    if (orderedIds.length === 0) return starred;
    const idToBookmark = new Map(starred.map((b) => [b.id, b]));
    const result: BookmarkRow[] = [];
    for (const id of orderedIds) {
      const bm = idToBookmark.get(id as BookmarkRow["id"]);
      if (bm) result.push(bm);
    }
    // Add any starred bookmarks not in orderedIds
    for (const bm of starred) {
      if (!orderedIds.includes(bm.id)) result.push(bm);
    }
    return result;
  }, [starred, orderedIds]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const currentIds = displayItems.map((b) => b.id);
      const oldIndex = currentIds.indexOf(active.id as BookmarkRow["id"]);
      const newIndex = currentIds.indexOf(over.id as BookmarkRow["id"]);
      if (oldIndex === -1 || newIndex === -1) return;

      const newOrder = arrayMove(currentIds, oldIndex, newIndex);
      setOrderedIds(newOrder);

      // Persist new order
      for (let i = 0; i < newOrder.length; i++) {
        const id = newOrder[i];
        if (!id) continue;
        updateStarOrder(id as BookmarkRow["id"], (i + 1) * 1000);
      }
    },
    [displayItems],
  );

  if (starred.length === 0) return null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={displayItems.map((b) => b.id)}
        strategy={rectSortingStrategy}
      >
        <div {...props(styles.grid)}>
          {displayItems.map((bookmark) => (
            <SortableTile key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

const MOBILE = "@media (max-width: 600px)";

const styles = create({
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(4, 1fr)",
      [MOBILE]: "repeat(2, 1fr)",
    },
    gap: spacing.xs,
  },
  tile: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xxs,
    paddingBlock: spacing.xs,
    paddingInline: spacing.s,
    backgroundColor: colors.hoverAndFocusBackground,
    borderRadius: 8,
    cursor: "pointer",
    userSelect: "none",
    overflow: "hidden",
    ":hover": {
      borderColor: colors.accent,
    },
  },
  favicon: {
    flexShrink: 0,
    borderRadius: 2,
  },
  tileTitle: {
    fontSize: fontSizes.step_1,
    fontFamily: fonts.sans,
    color: colors.accent,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});
