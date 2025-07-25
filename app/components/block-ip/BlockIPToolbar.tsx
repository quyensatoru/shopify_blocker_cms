import { InlineStack, Text, Button } from "@shopify/polaris";
import React from "react";

export default function BlockIPToolbar({ onAdd }: { onAdd: () => void }) {
  return (
    <InlineStack align="space-between" blockAlign="center">
      <Text variant="headingLg" as="h1">Blocked IP Rules</Text>
      <Button variant="primary" onClick={onAdd}>Add Block Rule</Button>
    </InlineStack>
  );
} 