import { action } from "@storybook/addon-actions"
import { ComboBoxOption, ComboBox } from "./ComboBox"
import { Link } from "../link/Link"
import { Form } from "../form/Form"

type RepositoryId =
  | "prisma"
  | "studio"
  | "cloud"
  | "engines"
  | "examples"
  | "docs"

const dynamicData: ComboBoxOption<RepositoryId>[] = [
  {
    key: "prisma",
    title: "prisma/prisma",
  },
  {
    key: "studio",
    title: "prisma/studio",
  },
  {
    key: "cloud",
    title: "prisma/cloud",
  },
  {
    key: "engines",
    title: "prisma/engines",
  },
  {
    key: "examples",
    title: "prisma/examples",
  },
  {
    key: "docs",
    title: "prisma/docs",
  },
]
const promiseWithDynamicData: Promise<ComboBoxOption<RepositoryId>[]> =
  new Promise((r) => setTimeout(() => r(dynamicData), 5000))

const dynamicDataWebRepos: ComboBoxOption<RepositoryId>[] = [
  {
    key: "studio",
    title: "prisma/studio",
  },
  {
    key: "cloud",
    title: "prisma/cloud",
  },
  {
    key: "docs",
    title: "prisma/docs",
  },
]
const dynamicDataOtherRepos: ComboBoxOption<RepositoryId>[] = [
  {
    key: "prisma",
    title: "prisma/prisma",
  },
  {
    key: "engines",
    title: "prisma/engines",
  },
  {
    key: "examples",
    title: "prisma/examples",
  },
]

export const Default = (props) => (
  <ComboBox.Container {...props}>
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/ComboBox",
  component: ComboBox.Container,
  argTypes: {
    label: { defaultValue: "Repository" },
  },
}

export const WithStaticData = () => (
  <ComboBox.Container
    label="Repository"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)

export const WithDynamicData = () => (
  <ComboBox.Container
    label="Repository"
    options={dynamicData}
    onSelectionChange={action("onSelectionChange")}
  >
    {(option) => (
      <ComboBox.Option key={option.key}>{option.title}</ComboBox.Option>
    )}
  </ComboBox.Container>
)

export const WithTrailingIcons = () => (
  <ComboBox.Container
    label="Repository"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Option key="prisma" trailingIcon="lock">
      prisma/prisma
    </ComboBox.Option>
    <ComboBox.Option key="studio" trailingIcon="lock">
      prisma/studio
    </ComboBox.Option>
    <ComboBox.Option key="cloud" trailingIcon="lock">
      prisma/cloud
    </ComboBox.Option>
    <ComboBox.Option key="engines" trailingIcon="lock">
      prisma/engines
    </ComboBox.Option>
    <ComboBox.Option key="examples" trailingIcon="lock">
      prisma/examples
    </ComboBox.Option>
    <ComboBox.Option key="docs" trailingIcon="lock">
      prisma/docs
    </ComboBox.Option>
  </ComboBox.Container>
)

export const WithTrailingIconsMultiline = () => (
  <ComboBox.Container
    label="Repository"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Option key="prisma" trailingIcon="lock">
      prisma/thisisareallyreallyreallyreallylongrepositoryname
    </ComboBox.Option>
    <ComboBox.Option key="studio" trailingIcon="lock">
      studio/thisisareallyreallyreallyreallyreallyreallyreallylongrepositoryname
    </ComboBox.Option>
    <ComboBox.Option key="cloud" trailingIcon="lock">
      cloud/thisisareallyreallyreallyreallyreallyreallyreallylongrepositoryname-withhyphens
    </ComboBox.Option>
    <ComboBox.Option key="engines" trailingIcon="lock">
      engines/thisisareallylongrepositoryname
    </ComboBox.Option>
    <ComboBox.Option key="examples" trailingIcon="lock">
      examples/thisisareallyreallyreallyreallyreallyreallyreallylongrepositoryname
    </ComboBox.Option>
    <ComboBox.Option key="docs" trailingIcon="lock">
      docs/thisisareallylongrepositoryname
    </ComboBox.Option>
  </ComboBox.Container>
)

export const WithDescriptions = () => (
  <div className="w-96">
    <Form>
      <ComboBox.Container
        label="Repository"
        onSelectionChange={action("onSelectionChange")}
      >
        <ComboBox.Option
          key="prisma"
          description="Next-generation ORM for Node.js & TypeScript | PostgreSQL, MySQL, MariaDB, SQL Server & SQLite "
        >
          prisma/prisma
        </ComboBox.Option>
        <ComboBox.Option
          key="studio"
          description="The easiest way to explore and manipulate your data in all of your Prisma projects."
        >
          prisma/studio
        </ComboBox.Option>
        <ComboBox.Option
          key="cloud"
          description="Platform for modern database collaboration. "
        >
          prisma/cloud
        </ComboBox.Option>
        <ComboBox.Option
          key="engines"
          description="Engine components of Prisma 2. "
        >
          prisma/engines
        </ComboBox.Option>
        <ComboBox.Option
          key="examples"
          description="🚀 Ready-to-run Prisma example projects "
        >
          prisma/examples
        </ComboBox.Option>
        <ComboBox.Option key="docs" description="📚 Prisma Documentation ">
          prisma/docs
        </ComboBox.Option>
      </ComboBox.Container>
    </Form>
  </div>
)

export const WithIconsAndDescriptions = () => (
  <div className="w-96">
    <Form>
      <ComboBox.Container
        label="Role"
        onSelectionChange={action("onSelectionChange")}
      >
        <ComboBox.Option
          key="admin"
          leadingIcon="user"
          description="Read and write access for the entire platform"
        >
          Admin
        </ComboBox.Option>
        <ComboBox.Option
          key="developer"
          leadingIcon="user-check"
          description="Read and write access to the database and read-only access for project settings and schema"
        >
          Developer
        </ComboBox.Option>
        <ComboBox.Option
          key="collaborator"
          leadingIcon="users"
          description="Read and write access to the database and read-only access for project settings"
        >
          Collaborator
        </ComboBox.Option>
        <ComboBox.Option
          key="viewer"
          leadingIcon="user"
          description="Read-only access for the entire platform"
        >
          Viewer
        </ComboBox.Option>
      </ComboBox.Container>
    </Form>
  </div>
)

export const WithFooter = () => (
  <ComboBox.Container
    label="Repository"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>

    <ComboBox.Footer onPress={action("onComboBoxFooterPress")}>
      Can't find ye repository?
      <Link href="" openInNewTab>
        Configure
      </Link>
    </ComboBox.Footer>
  </ComboBox.Container>
)

export const WithSectionsAndStaticData = () => (
  <ComboBox.Container
    label="Repository"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Section title="Web">
      <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
      <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
      <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
    </ComboBox.Section>
    <ComboBox.Section title="Other">
      <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
      <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
      <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    </ComboBox.Section>
  </ComboBox.Container>
)

export const WithSectionsAndDynamicData = () => (
  <ComboBox.Container
    label="Repository"
    options={dynamicData}
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Section title="Web" items={dynamicDataWebRepos}>
      {(option) => (
        <ComboBox.Option key={option.key}>{option.title}</ComboBox.Option>
      )}
    </ComboBox.Section>
    <ComboBox.Section title="Other" items={dynamicDataOtherRepos}>
      {(option) => (
        <ComboBox.Option key={option.key}>{option.title}</ComboBox.Option>
      )}
    </ComboBox.Section>
  </ComboBox.Container>
)

export const WithPlaceholder = () => (
  <ComboBox.Container
    label="Repository"
    placeholder="Select a repository"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)

export const WithAPreSelectedOption = () => (
  <ComboBox.Container
    label="Repository"
    defaultSelectedKey="cloud"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)

export const WithIconsInOptions = () => (
  <ComboBox.Container
    label="Database Provider"
    defaultSelectedKey="heroku"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Option key="planetscale" leadingIcon="planetscale">
      PlanetScale
    </ComboBox.Option>
    <ComboBox.Option key="heroku" leadingIcon="heroku">
      Heroku PostgreSQL
    </ComboBox.Option>
    <ComboBox.Option key="railway" leadingIcon="railway">
      Railway
    </ComboBox.Option>
  </ComboBox.Container>
)

export const Disabled = () => (
  <ComboBox.Container label="Repository" isDisabled>
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)

export const WithNoOptions = () => (
  <ComboBox.Container label="Repository"></ComboBox.Container>
)

export const WithAsyncLoading = () => {
  return (
    <ComboBox.Container label="Repository" options={promiseWithDynamicData}>
      {(option) => (
        <ComboBox.Option key={option.key}>{option.title}</ComboBox.Option>
      )}
    </ComboBox.Container>
  )
}

export const WithAsyncError = () => (
  <ComboBox.Container
    label="Repository"
    options={new Promise((_, r) => setTimeout(() => r("error"), 10))}
  >
    {(option) => (
      <ComboBox.Option key={option.key}>{option.title}</ComboBox.Option>
    )}
  </ComboBox.Container>
)

export const WithHint = () => (
  <ComboBox.Container label="Repository" hint="Pick a repository to continue">
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)

export const WithError = () => (
  <ComboBox.Container
    label="Repository"
    errorText="You do not have access to this repository"
  >
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)

export const WithHintAndError = () => (
  <ComboBox.Container
    label="Repository"
    hint="Pick a repository to continue"
    errorText="You do not have access to this repository"
  >
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)

export const WithValidator = () => (
  <div className="flex flex-col">
    <div className="mb-4 text-gray-500 dark:text-gray-400">
      All repositories except prisma/cloud are considered valid
    </div>
    <ComboBox.Container
      label="Repository"
      validator={(selectedKey) =>
        selectedKey === "cloud"
          ? "You don't have access to this repository"
          : undefined
      }
    >
      <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
      <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
      <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
      <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
      <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
      <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
    </ComboBox.Container>
  </div>
)
