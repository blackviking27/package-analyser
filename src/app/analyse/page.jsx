"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ContentContext } from "@/contexts/content.context";
import Link from "next/link";
import React, { useContext, useState } from "react";

const Analyse = () => {
  const [active, setActive] = useState("upload");
  const { setContext } = useContext(ContentContext);

  const handleFileData = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = (e) => {
      const content = e.target.result;
      setContext(content);
    };
  };

  const handleTextData = (event) => {
    setContext(event.target.value);
  };

  return (
    <main className="flex justify-center p-10">
      <section className="flex items-center justify-center  max-w-2xl">
        <div className="">
          <div className="text-2xl my-4">
            Upload or paste your{" "}
            <span className="text-emerald-500 ">package.json</span>
          </div>

          <div className="grid grid-cols-2 text-center my-2">
            <div
              className={`cursor-pointer p-2 transition-all duration-100  ${
                active === "upload" ? " bg-slate-100 p-2 rounded-sm" : ""
              }`}
              onClick={() => setActive("upload")}
            >
              Upload
            </div>
            <div
              className={`cursor-pointer p-2 transition-all duration-100 ${
                active === "paste" ? "bg-slate-100 rounded-sm" : ""
              }`}
              onClick={() => setActive("paste")}
            >
              Paste
            </div>
          </div>

          {active === "upload" ? (
            <div className="max-w-screen-sm grid items-center gap-2">
              <Label htmlFor="json">Upload your file </Label>
              <Input id="json" type="file" onChange={handleFileData} />
            </div>
          ) : (
            <div>
              <Label htmlFor="text" />
              <Textarea
                id="text"
                placeholder="Paste your package.json here..."
                onChange={handleTextData}
              />
            </div>
          )}
          <div className="flex justify-center">
            <Button variant="outline" className="my-4">
              <Link href="/result">Submit</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Analyse;
