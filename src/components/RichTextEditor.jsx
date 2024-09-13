import React, { useContext, useState } from "react";
import { Editor, EditorState, RichUtils, convertFromHTML, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "draft-js/dist/Draft.css";
import { Button } from "./ui/button";
import { BoldIcon, ItalicIcon, List } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "@/hooks/use-toast";
import { WorkSummaryChatSession } from "../../Service/WokrSummary";

const RichTextEditor = ({ onRichTextEditorChange, index }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { resumeInfo } = useContext(ResumeInfoContext);

  const handleEditorChange = (newState) => {
    setEditorState(newState);
    const contentState = newState.getCurrentContent();
    const htmlContent = stateToHTML(contentState); // Convert content to HTML
    onRichTextEditorChange(htmlContent); // Pass HTML content to parent component
  };

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleUnorderedListClick=()=>{
    setEditorState(RichUtils.toggleBlockType(editorState,"unordered-list-item"))
  }
  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo.experience[index].title) {
      return toast({ description: "Please add position title" });
    }

    const PROMPT = `Position Title: ${resumeInfo.experience[index].title}. Based on this position title, provide 5-7 bullet points for my experience in a resume, in HTML format.`;
    console.log(PROMPT);

    try {
      const result = await WorkSummaryChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();

      // Log AI response and make sure it's valid HTML
      console.log("AI Response:", responseText);

      // Parse the response as HTML and convert to Draft.js ContentState
      const blocksFromHTML = convertFromHTML(responseText);
      const newState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(newState));
    } catch (error) {
      console.error("Error in AI generation:", error);
      toast({ description: "Error generating summary from AI" });
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 border-primary text-primary"
          onClick={GenerateSummaryFromAI}
        >
          Generate work Summary with AI
        </Button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Button
          onClick={handleBoldClick}
          variant="ghost"
          className="text-primary"
        >
          <BoldIcon />
        </Button>
        <Button
          onClick={handleItalicClick}
          variant="ghost"
          className="text-primary"
        >
          <ItalicIcon />
        </Button>
        <Button
          onClick={handleUnorderedListClick}
          variant="ghost"
          className="text-primary"
        >
          <List />
        </Button>
      </div>
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          placeholder="Write something here..."
        />
      </div>
    </div>
  );
};

export default RichTextEditor;