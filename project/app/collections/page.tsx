import { Collections } from "@/components/collections/collections-list";
import { CreateCollection } from "@/components/collections/create-collection";

export default function CollectionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Collections</h1>
          <p className="text-muted-foreground">
            Organize your library materials into custom collections
          </p>
        </div>
        <CreateCollection />
      </div>
      <Collections />
    </div>
  );
}