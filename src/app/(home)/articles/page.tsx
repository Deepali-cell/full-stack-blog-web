import React from "react";
import ShowAllArticles from "../../../components/allArticles/ShowAllArticles";

const Page = ({ searchParams = {} }: { searchParams?: { search?: string } }) => {
  return <ShowAllArticles searchParams={searchParams} />;
};

export default Page;
