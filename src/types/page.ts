export type PageParams = {
  city: string;
  service: string;
};

export type PageProps = {
  params: PageParams;
  searchParams?: { [key: string]: string | string[] | undefined };
};
