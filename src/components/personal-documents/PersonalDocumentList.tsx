// src/components/personal-documents/PersonalDocumentList.tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Document {
  id: string;
  name: string;
  type: string;
  thumbnail: string;
  issued: string;
  expires: string;
  description: string;
}

interface Props {
  documents: Document[];
}

export default function PersonalDocumentList({ documents }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="flex flex-row items-center gap-4 p-4">
          <img
            src={doc.thumbnail}
            alt={doc.type}
            className="h-16 w-16 rounded border object-cover"
          />
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{doc.name}</span>
              <Badge>{doc.type}</Badge>
            </div>
            <div className="text-muted-foreground text-xs">
              Issued: {doc.issued}
              {doc.expires && <> &nbsp;|&nbsp; Expires: {doc.expires}</>}
            </div>
            <div className="text-sm">{doc.description}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
