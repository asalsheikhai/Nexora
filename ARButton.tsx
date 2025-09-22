import { Cube } from "lucide-react";
export default function ARButton() {
  const arUrl = process.env.NEXT_PUBLIC_AR_URL || "#";
  return (<a href={arUrl} className="btn btn-primary"><Cube className="h-5 w-5" />Launch AR</a>);
}
