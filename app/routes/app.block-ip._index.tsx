import {
  Page,
  LegacyCard,
  ResourceList,
  ResourceItem,
  TextField,
  Text,
  Badge,
  Button,
  InlineStack,
  Box,
  Icon,
  Card, BlockStack,
} from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from "react";
import { useNavigate } from '@remix-run/react';
import { useSelector } from 'react-redux';
import { selectShop } from '../redux/reducers/shop.reducer';

const initialBlockedIPs = [
  { id: "1", ip: "192.168.1.1", reason: "Spam", createdAt: "2024-06-01" },
  { id: "2", ip: "10.0.0.5", reason: "Brute force", createdAt: "2024-06-02" },
  { id: "3", ip: "172.16.0.2", reason: "Abuse", createdAt: "2024-06-03" },
];

export default function BlockIPPage() {
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [blockedIPs, setBlockedIPs] = useState(initialBlockedIPs);
  const navigate = useNavigate();
  const shop = useSelector(selectShop);

  console.log("shop", shop);

  const filteredIPs = blockedIPs.filter(
    (item) =>
      item.ip.includes(search) ||
      item.reason.toLowerCase().includes(search.toLowerCase())
  );

  const handleBulkRemove = useCallback(() => {
    setBlockedIPs((prev) =>
      prev.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
  }, [selectedItems]);

  const handleAdd = () => {
    navigate("/app/block-ip/add");
  };

  return (
    <Page
      title="Blocked IP Rules"
      primaryAction={{ content: "Add Block Rule", onAction: handleAdd }}
    >
      <Box paddingBlockEnd="400">
        <TextField
          label="Search IP or Reason"
          labelHidden
          value={search}
          onChange={setSearch}
          placeholder="Search IP or reason..."
          autoComplete="off"
          clearButton
          onClearButtonClick={() => setSearch("")}
        />
      </Box>
      {filteredIPs.length === 0 ? (
        <Card padding="600">
          <BlockStack align="center" inlineAlign="center" gap="100">
            <div className="Shopify-Icon__Large">
              <Icon source={SearchIcon} tone="subdued" accessibilityLabel="Search" />
            </div>
            <Box paddingBlockStart="200">
              <Text variant="headingLg" as="h3" tone="subdued">
                No results found
              </Text>
            </Box>
            <Box paddingBlockStart="100">
              <Text as="p" tone="subdued">
                We couldn’t find any results matching your search.
              </Text>
            </Box>
          </BlockStack>
        </Card>
      ) : (
        <LegacyCard>
          <ResourceList
            resourceName={{ singular: "IP", plural: "IPs" }}
            items={filteredIPs}
            selectedItems={selectedItems}
            onSelectionChange={(selected) =>
              setSelectedItems(Array.isArray(selected) ? selected : [])
            }
            bulkActions={[
              {
                content: "Remove selected",
                onAction: handleBulkRemove,
              },
            ]}
            renderItem={(item) => {
              const { id, ip, reason, createdAt } = item;
              return (
                <ResourceItem id={id} accessibilityLabel={`View details for ${ip}`} onClick={() => {}}>
                  <InlineStack align="space-between" blockAlign="center">
                    <Text as="span" fontWeight="semibold">
                      {ip}
                    </Text>
                    <Badge tone="critical">{reason}</Badge>
                    <Text as="span" tone="subdued" variant="bodySm">
                      {createdAt}
                    </Text>
                    <Button size="slim" variant="tertiary">
                      Remove
                    </Button>
                  </InlineStack>
                </ResourceItem>
              );
            }}
          />
        </LegacyCard>
      )}
    </Page>
  );
}
