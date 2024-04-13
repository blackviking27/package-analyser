"use client";
import { ContentContext } from "@/contexts/content.context";
import { redirect } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, AlertCircleIcon } from "lucide-react";
import ResultComponent from "./ResultComponent";

const Result = () => {
  const { context } = useContext(ContentContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dependencies, setDependencies] = useState({});
  const [devDependencies, setDevDependencies] = useState({});

  if (context === undefined || context === null) redirect("/analyse");

  const parseJsonData = async (data) => {
    try {
      let parsedPackageJson = JSON.parse(data);

      let dependenciesPromise = fetch("/api/packages", {
        method: "POST",
        body: JSON.stringify(parsedPackageJson.dependencies),
      });

      let result = await Promise.allSettled([
        dependenciesPromise,
        // devDependenciesPromise,
      ]);
      console.log(result);

      const dependeciesData = await result[0].value.json();

      setDependencies(dependeciesData.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // useEffect(() => {
  parseJsonData(context);
  // }, []);

  return (
    <div className="px-16 md:px-32">
      {loading ? (
        <div className="flex items-center justify-center py-8">
          Parsing your json ...
        </div>
      ) : (
        <ResultComponent title="Dependencies" result={dependencies} />
      )}
      {error !== "" && (
        <Alert className="max-w-2xl" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error while parsing JSON</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Result;
