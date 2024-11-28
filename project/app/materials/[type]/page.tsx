import MaterialsClientPage from "@/components/MaterialsClientPage";

export async function generateStaticParams() {
  // Define the possible `type` values
  const types = ["books", "videos", "audio", "journals"];

  // Return an array of params for each static page
  return types.map((type) => ({ type }));
}

export default function Page({ params }: { params: { type: string } }) {
  return <MaterialsClientPage type={params.type} />;
}
