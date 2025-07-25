import { Box, InlineStack, Text, Badge, Button } from "@shopify/polaris";
import React from "react";

export default function BlockIPRow({ ip, reason, createdAt }: { ip: string, reason: string, createdAt: string }) {
  return (
    <Box paddingBlock="200" borderBlockEndWidth="025" borderColor="border">
      <InlineStack align="space-between" blockAlign="center">
        <Text as="span" fontWeight="semibold">{ip}</Text>
        <Badge tone="critical">{reason}</Badge>
        <Text as="span" tone="subdued" variant="bodySm">{createdAt}</Text>
        <Button size="slim" variant="tertiary">Remove</Button>
      </InlineStack>
    </Box>
  );
} 