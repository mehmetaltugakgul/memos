import Emphasis from "./Emphasis";
import Bold from "./Bold";
import { marked } from "..";
import InlineCode from "./InlineCode";
import BoldEmphasis from "./BoldEmphasis";
import PlainText from "./PlainText";
import { matcher } from "../matcher";
import Mark from "./Mark";

export const LINK_REG = /\[(.*?)\]\((.+?)\)+/;

const renderer = (rawStr: string, highlightWord?: string) => {
  const matchResult = matcher(rawStr, LINK_REG);
  if (!matchResult) {
    return rawStr;
  }
  let parsedContent;
  if (highlightWord) {
    parsedContent = marked(matchResult[1], highlightWord, [], [Mark, InlineCode, BoldEmphasis, Emphasis, Bold, PlainText]);
  } else {
    parsedContent = marked(matchResult[1], highlightWord, [], [InlineCode, BoldEmphasis, Emphasis, Bold, PlainText]);
  }
  return (
    <a className="link" target="_blank" rel="noreferrer" href={matchResult[2]}>
      {parsedContent}
    </a>
  );
};

export default {
  name: "link",
  regexp: LINK_REG,
  renderer,
};
