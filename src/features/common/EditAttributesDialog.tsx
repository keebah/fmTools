import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

import { RoleWithKey } from "../../types/role";
import "./styles.css";

const EditAttributesDialog = ({ role }: { role: RoleWithKey | undefined }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Edit Attribute Weights</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Attribute Weights</Dialog.Title>
        <Dialog.Description mb="4">
          Edit Attribute Weights for role {role?.key}
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              defaultValue="Freja Johnsen"
              placeholder="Enter your full name"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              defaultValue="freja@example.com"
              placeholder="Enter your email"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditAttributesDialog;
