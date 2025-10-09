import { StickyHeading } from "@rhei/react";

export default function SectionTitle({ content }: { content: string }) {
  return (
    <StickyHeading>
      <h2 className="text-h2 bg-normal border-sub mb-2 border-b">
        <span className="text-brand">
          {content.substring(0, HIGHLIGHT_LENGTH)}
        </span>
        {content.substring(HIGHLIGHT_LENGTH)}
      </h2>
    </StickyHeading>
  );
}

const HIGHLIGHT_LENGTH = 1;
