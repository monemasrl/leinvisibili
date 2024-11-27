"use client";
import React from "react";

// Crea un componente che renderizza un tag script con il contenuto JSON-LD

function JsonldMetaData({ metadata }: { metadata: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(metadata.jsonld) }}
      key="product-jsonld"
    />
  );
}

export default JsonldMetaData;
