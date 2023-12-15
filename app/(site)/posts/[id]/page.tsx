interface Props {
  params: { id: string };
}

export default async function Post({ params: { id } }: Props) {
  return <div>{id}</div>;
}
