"use client";

import React, { useState, useRef, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { SmileIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EmojiPickerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEmojiSelect: (emoji: any) => void;
  className?: string;
  buttonClassName?: string;
}

export function EmojiPicker({ onEmojiSelect, className, buttonClassName }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmojiSelect = (emoji: any) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        ref={buttonRef}
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-10 w-10 p-0 hover:bg-muted/50 transition-colors",
          buttonClassName
        )}
        title="Add emoji"
      >
        <SmileIcon className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div
          ref={pickerRef}
          className="absolute bottom-full right-0 mb-2 z-50"
        >
          <div className="bg-card border border-border rounded-lg shadow-lg">
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="auto"
              set="native"
              previewPosition="none"
              skinTonePosition="none"
              searchPosition="sticky"
              categories={["frequent", "people", "nature", "foods", "activity", "places", "objects", "symbols", "flags"]}
              maxFrequentRows={4}
              perLine={8}
              emojiSize={28}
              emojiButtonSize={40}
              emojiButtonRadius="8px"
              noCountryFlags={false}
              noResultsEmoji="cry"
              previewEmoji="point_up"
              icons="auto"
              locale="en"
              skin={1}
              navPosition="top"
              dynamicWidth={false}
              emojiButtonColors={[]}
              exceptEmojis={[]}
              getSpritesheetURL={null}
              onAddCustomEmoji={null}
              onClickOutside={() => setIsOpen(false)}
              autoFocus={false}
              categoryIcons={{}}
            />
          </div>
        </div>
      )}
    </div>
  );
} 