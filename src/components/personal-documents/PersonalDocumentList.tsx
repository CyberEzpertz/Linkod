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
            className="w-16 h-16 rounded object-cover border"
          />
          <div className="flex flex-col flex-1 gap-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{doc.name}</span>
              <Badge>{doc.type}</Badge>
            </div>
            <div className="text-xs text-muted-foreground">
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