"use client";
import { Image } from "../image/Image";
import { GenerateButton } from "../button/GenerateButton";

import { WithContext as ReactTags } from "react-tag-input";
import { TAGS } from "../tags/TAGS";
import OpenAI from "openai";
import { Loader } from "../loader/Loader";
import { prompts } from "../prompts";
import { InputFocus } from "./useref";
import { useState, useEffect, FC } from "react";
import * as React from "react";

const openai = new OpenAI({
  apiKey: "openApiKey",
  dangerouslyAllowBrowser: true,
});
type TagsData = {
  id: string;
  text: string;
};
export default function Form() {
  const [prompt, setPrompt] = useState<string>("");
  const [tags, setTags] = useState<TagsData[]>([]);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };
  let currentPrompt = "";
  const onFetch = async (prompt: string, isSurprise: boolean) => {
    if (prompt === "" && isSurprise === false) {
      alert("Please enter a prompt");
    } else {
      setIsLoading(true);

      if (isSurprise === true) {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        const randomPrompt = prompts[randomIndex];
        setPrompt(randomPrompt);
        currentPrompt = randomPrompt;
        setPrompt("");
      } else {
        const newTags = tags.map((element) => {
          return element.text;
        });
        newTags.join(" ");
        currentPrompt = prompt + " " + newTags;
        console.log("🚀 ~ onFetch ~ newTags:", newTags);
      }
      console.log("🚀 ~ onFetch ~ propmt:", prompt);
      console.log(currentPrompt);

      const response = await openai.images.generate({
        model: "dall-e-3",

        prompt: currentPrompt,

        n: 1,
        size: "1024x1024",
      });
      if (response.data[0].url) {
        setImageSrc(response.data[0].url);
      }
      setTimeout(() => {}, 2000); //
      setIsLoading(false);
    }

    //setPrompt("");
  };

  const suggestions = TAGS.map((element) => {
    return {
      id: element,
      text: element,
    };
  });
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: TagsData) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: TagsData, currPos: number, newPos: number) => {
    const newTags = tags.slice();
    console.log(tag);
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <div className="flex flex-row w-11/12 h-full p-10  justify-between text-neutral-900 ">
      <div className="w-2/5 flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-neutral-900 text-6xl font-semibold">Create</h1>
          <p>
            your own imaginative and visually absolutly gorgeous images with
            DALL-E
          </p>
        </div>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label>
              Prompt <span className="text-[rgb(81,76,254)]">*</span>
            </label>
            <InputFocus onChange={inputHandler} />
          </div>
          <div className="flex flex-col">
            <label>Tags</label>

            <div>
              <ReactTags
                tags={tags}
                delimiters={delimiters}
                suggestions={suggestions}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                autocomplete
                //@ts-ignore
                maxTags={10}
              />
            </div>
          </div>
          <em className="text-neutral-400">
            Custom tags must be between 4 and 12 characters in length and only
            contain the letters A-Z Select a maximum of 10 tags
          </em>
        </form>
        <div className="flex flex-row gap-5 ">
          <button
            className="w-36 h-9 animate-[fade-in_1s_ease-in-out]  hover:bg-neutral-300 bg-transparent border-solid border border-black text-neutral-900 rounded-2xl "
            onClick={async () => {
              await onFetch(prompt, true);
            }}
          >
            Surprise me
          </button>
          <GenerateButton onClick={async () => await onFetch(prompt, false)} />
        </div>
      </div>
      <div className="w-2/5 flex items-center  ">
        {isLoading === false ? <Image src={imageSrc} /> : <Loader />}
      </div>
    </div>
  );
}

{
  /* <Suspense fallback={<Loading/>}>
  <Component/>
</Suspense> */
}
