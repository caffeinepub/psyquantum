import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Loader2,
  LogIn,
  LogOut,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { type Article, ArticleType } from "../backend";
import { ProjectStatus } from "../backend";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useClaimFirstAdmin,
  useCreateArticle,
  useCreateProject,
  useDeleteArticle,
  useDeleteProject,
  useForceResetAdmin,
  useGetAllSiteTexts,
  useGetArticles,
  useGetCreatorImageUrl,
  useGetLogoUrl,
  useGetProjects,
  useIsAdmin,
  useIsAdminClaimed,
  useSetCreatorImageUrl,
  useSetLogoUrl,
  useSetSiteText,
  useUpdateArticle,
  useUpdateProject,
} from "../hooks/useQueries";
import type { Project } from "../types/project";

// ─── Article Form ─────────────────────────────────────────────────────────────

interface ArticleFormData {
  title: string;
  description: string;
  content: string[];
  articleType: ArticleType;
  author: string;
  displayOrder: string;
}

const defaultArticleForm: ArticleFormData = {
  title: "",
  description: "",
  content: [""],
  articleType: ArticleType.concept,
  author: "PsyQuantum",
  displayOrder: "0",
};

function ArticleForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
  submitLabel,
}: {
  initial: ArticleFormData;
  onSubmit: (data: ArticleFormData) => void;
  onCancel: () => void;
  isPending: boolean;
  submitLabel: string;
}) {
  const [form, setForm] = useState<ArticleFormData>(initial);

  function updateField<K extends keyof ArticleFormData>(
    key: K,
    value: ArticleFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateParagraph(idx: number, val: string) {
    setForm((prev) => {
      const content = [...prev.content];
      content[idx] = val;
      return { ...prev, content };
    });
  }

  function addParagraph() {
    setForm((prev) => ({ ...prev, content: [...prev.content, ""] }));
  }

  function removeParagraph(idx: number) {
    setForm((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== idx),
    }));
  }

  return (
    <form
      data-ocid="admin.article_form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="art-title">Title</Label>
          <Input
            id="art-title"
            data-ocid="admin.input"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Article title"
            required
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="art-description">Description</Label>
          <Textarea
            id="art-description"
            data-ocid="admin.textarea"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Short description"
            rows={3}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Type</Label>
          <Select
            value={form.articleType}
            onValueChange={(v) => updateField("articleType", v as ArticleType)}
          >
            <SelectTrigger data-ocid="admin.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ArticleType.concept}>Concept</SelectItem>
              <SelectItem value={ArticleType.explained}>Explained</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="art-author">Author</Label>
          <Input
            id="art-author"
            value={form.author}
            onChange={(e) => updateField("author", e.target.value)}
            placeholder="Author name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="art-order">Display Order</Label>
          <Input
            id="art-order"
            type="number"
            value={form.displayOrder}
            onChange={(e) => updateField("displayOrder", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Content Paragraphs</Label>
        {form.content.map((para, idx) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: mutable ordered list
          <div key={idx} className="flex gap-2">
            <Textarea
              value={para}
              onChange={(e) => updateParagraph(idx, e.target.value)}
              placeholder={`Paragraph ${idx + 1}`}
              rows={3}
              className="flex-1"
            />
            {form.content.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeParagraph(idx)}
                className="self-start mt-1 text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addParagraph}
          className="gap-2"
        >
          <Plus className="w-4 h-4" /> Add Paragraph
        </Button>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          data-ocid="admin.submit_button"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

// ─── Project Form ─────────────────────────────────────────────────────────────

interface ProjectFormData {
  title: string;
  description: string;
  status: ProjectStatus;
  tags: string;
  link: string;
  displayOrder: string;
}

const defaultProjectForm: ProjectFormData = {
  title: "",
  description: "",
  status: ProjectStatus.active,
  tags: "",
  link: "",
  displayOrder: "0",
};

function ProjectForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
  submitLabel,
}: {
  initial: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  isPending: boolean;
  submitLabel: string;
}) {
  const [form, setForm] = useState<ProjectFormData>(initial);

  function updateField<K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      data-ocid="admin.project_form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="proj-title">Title</Label>
          <Input
            id="proj-title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Project title"
            required
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="proj-description">Description</Label>
          <Textarea
            id="proj-description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Short description"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={form.status}
            onValueChange={(v) => updateField("status", v as ProjectStatus)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inProgress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="proj-order">Display Order</Label>
          <Input
            id="proj-order"
            type="number"
            value={form.displayOrder}
            onChange={(e) => updateField("displayOrder", e.target.value)}
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="proj-tags">Tags (comma-separated)</Label>
          <Input
            id="proj-tags"
            value={form.tags}
            onChange={(e) => updateField("tags", e.target.value)}
            placeholder="AI, Robotics, Python"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="proj-link">Link (optional)</Label>
          <Input
            id="proj-link"
            value={form.link}
            onChange={(e) => updateField("link", e.target.value)}
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

// ─── Main Admin Page ─────────────────────────────────────────────────────────

// ─── Site Text Field Component ───────────────────────────────────────────────

function SiteTextField({
  label,
  textKey,
  placeholder,
  multiline = false,
  rows = 2,
  siteTexts,
}: {
  label: string;
  textKey: string;
  placeholder: string;
  multiline?: boolean;
  rows?: number;
  siteTexts: Record<string, string>;
}) {
  const [value, setValue] = useState(siteTexts[textKey] ?? "");
  const setSiteText = useSetSiteText();
  const isDirty = value !== (siteTexts[textKey] ?? "");

  // Sync when siteTexts updates (e.g. after save)
  const currentBackend = siteTexts[textKey] ?? "";

  return (
    <div className="space-y-2">
      <Label className="text-sm text-muted-foreground font-medium">
        {label}
      </Label>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="resize-none bg-card/30 border-border focus:border-primary/50"
          data-ocid={`admin.sitetext.${textKey.replace(/\./g, "-")}.textarea`}
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="bg-card/30 border-border focus:border-primary/50"
          data-ocid={`admin.sitetext.${textKey.replace(/\./g, "-")}.input`}
        />
      )}
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          disabled={
            setSiteText.isPending || (!isDirty && currentBackend !== "")
          }
          onClick={async () => {
            try {
              await setSiteText.mutateAsync({ key: textKey, value });
              toast.success("Saved!");
            } catch {
              toast.error("Failed to save.");
            }
          }}
          className="gap-2"
          data-ocid={`admin.sitetext.${textKey.replace(/\./g, "-")}.save_button`}
        >
          {setSiteText.isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : null}
          Save
        </Button>
        {isDirty && (
          <span className="text-xs text-primary/70">Unsaved changes</span>
        )}
      </div>
    </div>
  );
}

function SiteTextTab() {
  const { data: siteTexts = {} } = useGetAllSiteTexts();

  const sectionClass = "mb-10";
  const headingClass =
    "font-display font-bold text-xl text-foreground mb-6 flex items-center gap-3";
  const fieldGridClass = "space-y-6";

  return (
    <div className="space-y-2">
      <p className="text-muted-foreground text-sm mb-8">
        Edit any text displayed on the site. Changes take effect immediately
        after saving.
      </p>

      {/* Nav Labels */}
      <div className={sectionClass}>
        <h2 className={headingClass}>
          <span className="w-1 h-6 rounded-full bg-primary flex-shrink-0" />
          Nav Labels
        </h2>
        <div className={fieldGridClass}>
          <SiteTextField
            label="Concepts"
            textKey="nav.concepts"
            placeholder="Concepts"
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Explained"
            textKey="nav.explained"
            placeholder="Explained"
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Projects"
            textKey="nav.projects"
            placeholder="Projects"
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="About"
            textKey="nav.about"
            placeholder="About"
            siteTexts={siteTexts}
          />
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Home Page */}
      <div className={sectionClass} style={{ paddingTop: "2rem" }}>
        <h2 className={headingClass}>
          <span className="w-1 h-6 rounded-full bg-primary flex-shrink-0" />
          Home Page
        </h2>
        <div className={fieldGridClass}>
          <SiteTextField
            label="Hero Tagline"
            textKey="home.hero.tagline"
            placeholder="Exploring deep ideas in science, mathematics, and technology."
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Hero Subtitle"
            textKey="home.hero.subtitle"
            placeholder="A platform for curious minds..."
            multiline
            rows={2}
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="CTA Banner Title"
            textKey="home.cta.title"
            placeholder="Explore Knowledge in Two Formats"
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="CTA Banner Description"
            textKey="home.cta.description"
            placeholder="Every idea presented twice..."
            multiline
            rows={2}
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Stat: Concept Articles Number"
            textKey="home.stat.concepts"
            placeholder="5+"
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Stat: Explained Stories Number"
            textKey="home.stat.explained"
            placeholder="4+"
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Stat: Topics Covered Number"
            textKey="home.stat.topics"
            placeholder="∞"
            siteTexts={siteTexts}
          />
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Concepts Page */}
      <div className={sectionClass} style={{ paddingTop: "2rem" }}>
        <h2 className={headingClass}>
          <span className="w-1 h-6 rounded-full bg-primary flex-shrink-0" />
          Concepts Page
        </h2>
        <div className={fieldGridClass}>
          <SiteTextField
            label="Page Title"
            textKey="concepts.title"
            placeholder="Concepts"
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Page Description"
            textKey="concepts.description"
            placeholder="Structured philosophical and technical explorations..."
            multiline
            rows={2}
            siteTexts={siteTexts}
          />
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Explained Page */}
      <div className={sectionClass} style={{ paddingTop: "2rem" }}>
        <h2 className={headingClass}>
          <span className="w-1 h-6 rounded-full bg-primary flex-shrink-0" />
          Explained Page
        </h2>
        <div className={fieldGridClass}>
          <SiteTextField
            label="Page Title"
            textKey="explained.title"
            placeholder="Explained"
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Page Description"
            textKey="explained.description"
            placeholder="Complex ideas told through narrative..."
            multiline
            rows={2}
            siteTexts={siteTexts}
          />
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Projects Page */}
      <div className={sectionClass} style={{ paddingTop: "2rem" }}>
        <h2 className={headingClass}>
          <span className="w-1 h-6 rounded-full bg-primary flex-shrink-0" />
          Projects Page
        </h2>
        <div className={fieldGridClass}>
          <SiteTextField
            label="Page Title"
            textKey="projects.title"
            placeholder="Projects"
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Page Description"
            textKey="projects.description"
            placeholder="Robotics, AI, and experimental technology..."
            multiline
            rows={2}
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Empty State Title"
            textKey="projects.empty.title"
            placeholder="Projects"
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Empty State Description"
            textKey="projects.empty.description"
            placeholder="Projects currently under development."
            multiline
            rows={2}
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Empty State Subtext"
            textKey="projects.empty.subtext"
            placeholder="Robotics, AI, and experimental technology projects are being built. Check back soon."
            multiline
            rows={2}
            siteTexts={siteTexts}
          />
        </div>
      </div>

      <div className="border-t border-border" />

      {/* About Page */}
      <div className={sectionClass} style={{ paddingTop: "2rem" }}>
        <h2 className={headingClass}>
          <span className="w-1 h-6 rounded-full bg-primary flex-shrink-0" />
          About Page
        </h2>
        <div className={fieldGridClass}>
          <SiteTextField
            label="Platform Paragraph 1"
            textKey="about.platform.p1"
            placeholder="PsyQuantum is a knowledge exploration platform..."
            multiline
            rows={3}
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Platform Paragraph 2"
            textKey="about.platform.p2"
            placeholder="Every idea on PsyQuantum is presented in two distinct formats:"
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Platform Paragraph 3"
            textKey="about.platform.p3"
            placeholder="The platform is built on the belief..."
            multiline
            rows={3}
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Creator Paragraph 1"
            textKey="about.creator.p1"
            placeholder="PsyQuantum was created by Piyush..."
            multiline
            rows={3}
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Creator Paragraph 2"
            textKey="about.creator.p2"
            placeholder="The goal of PsyQuantum is to explore ideas..."
            multiline
            rows={3}
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Creator Paragraph 3"
            textKey="about.creator.p3"
            placeholder="Piyush believes that extraordinary ideas..."
            multiline
            rows={3}
            siteTexts={siteTexts}
          />
          <SiteTextField
            label="Contact Text"
            textKey="about.contact.text"
            placeholder="Reach out on Instagram for questions, ideas, or collaboration:"
            siteTexts={siteTexts}
          />
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { actor } = useActor();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  useIsAdminClaimed();
  const { data: articles, isLoading: articlesLoading } = useGetArticles();
  const { data: projects, isLoading: projectsLoading } = useGetProjects();
  const { data: logoUrl } = useGetLogoUrl();
  const { data: creatorImageUrl } = useGetCreatorImageUrl();

  const createArticleMutation = useCreateArticle();
  const updateArticleMutation = useUpdateArticle();
  const deleteArticleMutation = useDeleteArticle();
  const claimAdminMutation = useClaimFirstAdmin();
  const forceResetAdminMutation = useForceResetAdmin();
  const [resetSecret, setResetSecret] = useState("");
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();
  const setLogoMutation = useSetLogoUrl();
  const setCreatorImageMutation = useSetCreatorImageUrl();

  const [showCreateArticle, setShowCreateArticle] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<bigint | null>(null);
  const [expandedArticleId, setExpandedArticleId] = useState<bigint | null>(
    null,
  );

  const [showCreateProject, setShowCreateProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<bigint | null>(null);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [creatorImagePreview, setCreatorImagePreview] = useState<string | null>(
    null,
  );
  const creatorFileInputRef = useRef<HTMLInputElement>(null);

  const isLoggedIn = !!identity;
  const [pendingPassword, setPendingPassword] = useState("");
  const [isAutoSetup, setIsAutoSetup] = useState(false);

  // Auto reset+claim admin after login when password was entered
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally run only on loginStatus/actor change
  useEffect(() => {
    if (loginStatus === "success" && pendingPassword && actor && !isAdmin) {
      (async () => {
        setIsAutoSetup(true);
        try {
          const ok = await forceResetAdminMutation.mutateAsync(pendingPassword);
          if (ok) {
            const claimed = await claimAdminMutation.mutateAsync();
            if (claimed) {
              toast.success("Admin access granted!");
              setPendingPassword("");
              window.location.reload();
            } else {
              toast.error(
                "Claim failed after reset. Please reload and try again.",
              );
            }
          } else {
            toast.error("Wrong password. Please enter: psyquantum-reset-2026");
          }
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          toast.error(`Setup failed: ${msg}`);
        } finally {
          setIsAutoSetup(false);
        }
      })();
    }
  }, [loginStatus, actor]);
  const isLoggingIn = loginStatus === "logging-in";

  function getEditArticleInitial(article: Article): ArticleFormData {
    return {
      title: article.title,
      description: article.description,
      content: article.content,
      articleType: article.articleType,
      author: article.author,
      displayOrder: article.displayOrder.toString(),
    };
  }

  function getEditProjectInitial(project: Project): ProjectFormData {
    return {
      title: project.title,
      description: project.description,
      status: project.status,
      tags: project.tags.join(", "),
      link: project.link,
      displayOrder: project.displayOrder.toString(),
    };
  }

  async function handleCreateArticle(data: ArticleFormData) {
    try {
      await createArticleMutation.mutateAsync({
        title: data.title,
        description: data.description,
        content: data.content.filter((p) => p.trim()),
        articleType: data.articleType,
        author: data.author,
        displayOrder: BigInt(Number.parseInt(data.displayOrder) || 0),
      });
      toast.success("Article created!");
      setShowCreateArticle(false);
    } catch {
      toast.error("Failed to create article.");
    }
  }

  async function handleUpdateArticle(id: bigint, data: ArticleFormData) {
    try {
      await updateArticleMutation.mutateAsync({
        id,
        title: data.title,
        description: data.description,
        content: data.content.filter((p) => p.trim()),
        articleType: data.articleType,
        author: data.author,
        displayOrder: BigInt(Number.parseInt(data.displayOrder) || 0),
      });
      toast.success("Article updated!");
      setEditingArticleId(null);
    } catch {
      toast.error("Failed to update article.");
    }
  }

  async function handleDeleteArticle(id: bigint) {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    try {
      await deleteArticleMutation.mutateAsync(id);
      toast.success("Article deleted.");
    } catch {
      toast.error("Failed to delete article.");
    }
  }

  async function handleCreateProject(data: ProjectFormData) {
    try {
      await createProjectMutation.mutateAsync({
        title: data.title,
        description: data.description,
        status: data.status,
        tags: data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        link: data.link,
        displayOrder: BigInt(Number.parseInt(data.displayOrder) || 0),
      });
      toast.success("Project created!");
      setShowCreateProject(false);
    } catch {
      toast.error("Failed to create project.");
    }
  }

  async function handleUpdateProject(id: bigint, data: ProjectFormData) {
    try {
      await updateProjectMutation.mutateAsync({
        id,
        title: data.title,
        description: data.description,
        status: data.status,
        tags: data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        link: data.link,
        displayOrder: BigInt(Number.parseInt(data.displayOrder) || 0),
      });
      toast.success("Project updated!");
      setEditingProjectId(null);
    } catch {
      toast.error("Failed to update project.");
    }
  }

  async function handleDeleteProject(id: bigint) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    try {
      await deleteProjectMutation.mutateAsync(id);
      toast.success("Project deleted.");
    } catch {
      toast.error("Failed to delete project.");
    }
  }

  function compressImage(
    file: File,
    maxSize: number,
    cb: (dataUrl: string) => void,
  ) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          } else {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, width, height);
        cb(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  function handleLogoFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    compressImage(file, 400, setLogoPreview);
  }

  async function handleSaveLogo() {
    if (!logoPreview) return;
    try {
      await setLogoMutation.mutateAsync(logoPreview);
      toast.success("Logo updated!");
      setLogoPreview(null);
    } catch {
      toast.error("Failed to update logo.");
    }
  }

  function handleCreatorImageFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    compressImage(file, 400, setCreatorImagePreview);
  }

  async function handleSaveCreatorImage() {
    if (!creatorImagePreview) return;
    try {
      await setCreatorImageMutation.mutateAsync(creatorImagePreview);
      toast.success("Creator image updated!");
      setCreatorImagePreview(null);
    } catch {
      toast.error("Failed to update creator image.");
    }
  }

  async function handleRemoveCreatorImage() {
    if (
      !confirm("Remove the creator image? A placeholder will be shown instead.")
    )
      return;
    try {
      await setCreatorImageMutation.mutateAsync("");
      toast.success("Creator image removed.");
      setCreatorImagePreview(null);
    } catch {
      toast.error("Failed to remove creator image.");
    }
  }

  async function handleForceReset() {
    if (!resetSecret.trim()) {
      toast.error("Please enter the reset secret.");
      return;
    }
    try {
      const ok = await forceResetAdminMutation.mutateAsync(resetSecret.trim());
      if (ok) {
        // Auto-claim admin immediately after reset — no second step needed
        try {
          const claimed = await claimAdminMutation.mutateAsync();
          if (claimed) {
            toast.success("Admin access granted! Welcome to the admin panel.");
            setResetSecret("");
            window.location.reload();
          } else {
            toast.error(
              "Reset succeeded but claim failed — please reload and click 'Claim Admin Access'.",
            );
            window.location.reload();
          }
        } catch (claimErr) {
          const msg =
            claimErr instanceof Error ? claimErr.message : String(claimErr);
          toast.error(`Reset ok but claim error: ${msg}. Reloading…`);
          window.location.reload();
        }
      } else {
        toast.error(
          "Incorrect reset secret. The password is: psyquantum-reset-2026",
        );
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      toast.error(`Reset failed: ${msg}`);
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
        <div className="text-center max-w-md w-full px-4">
          <div className="w-16 h-16 rounded-2xl border border-border flex items-center justify-center mx-auto mb-6 bg-card/50">
            <img
              src="/assets/uploads/WhatsApp-Image-2026-03-14-at-11.02.13-PM-4.jpeg"
              alt="PsyQuantum"
              className="w-full h-full object-contain block"
            />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Admin Panel
          </h1>
          <p className="text-muted-foreground mb-6">
            Enter your admin password to access the panel.
          </p>
          <div className="flex flex-col gap-3 w-full">
            <Input
              type="password"
              placeholder="Admin password"
              value={pendingPassword}
              onChange={(e) => setPendingPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && pendingPassword.trim()) {
                  login();
                }
              }}
              className="text-center"
              data-ocid="admin.password.input"
            />
            <Button
              data-ocid="admin.login_button"
              onClick={login}
              disabled={isLoggingIn || !pendingPassword.trim()}
              size="lg"
              className="gap-2 w-full"
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {isLoggingIn ? "Connecting..." : "Enter Admin Panel"}
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (adminLoading) {
    return (
      <main className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <Loader2
          className="w-8 h-8 animate-spin text-primary"
          data-ocid="admin.loading_state"
        />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
        <div className="text-center max-w-md w-full px-4">
          <div className="w-16 h-16 rounded-2xl border border-destructive/30 flex items-center justify-center mx-auto mb-6 bg-destructive/10">
            <ShieldCheck className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Access Denied
          </h1>
          <p className="text-muted-foreground mb-6">
            Your account is not the admin. Enter the admin password to take over
            admin access.
          </p>
          <div className="flex flex-col gap-3 w-full">
            <Input
              type="password"
              placeholder="Admin password"
              value={resetSecret}
              onChange={(e) => setResetSecret(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && resetSecret.trim()) handleForceReset();
              }}
              className="text-center"
              data-ocid="admin.reset_secret.input"
            />
            <Button
              variant="destructive"
              size="lg"
              onClick={handleForceReset}
              disabled={
                forceResetAdminMutation.isPending ||
                isAutoSetup ||
                !resetSecret.trim()
              }
              className="gap-2 w-full"
              data-ocid="admin.reset_admin.button"
            >
              {forceResetAdminMutation.isPending || isAutoSetup ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              {forceResetAdminMutation.isPending || isAutoSetup
                ? "Setting up..."
                : "Reclaim Admin Access"}
            </Button>
            <Button variant="outline" onClick={clear} className="gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const sortedArticles = [...(articles ?? [])].sort(
    (a, b) => Number(a.displayOrder) - Number(b.displayOrder),
  );
  const sortedProjects = [...(projects ?? [])].sort(
    (a, b) => Number(a.displayOrder) - Number(b.displayOrder),
  );

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-primary font-mono text-sm mb-2">{"// admin"}</p>
            <h1 className="font-display font-bold text-4xl text-foreground">
              Admin Panel
            </h1>
          </div>
          <Button variant="outline" size="icon" onClick={clear} title="Logout">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        <Tabs defaultValue="articles">
          <TabsList className="mb-8 bg-card/40 border border-border">
            <TabsTrigger value="articles" data-ocid="admin.articles.tab">
              Articles
            </TabsTrigger>
            <TabsTrigger value="projects" data-ocid="admin.projects.tab">
              Projects
            </TabsTrigger>
            <TabsTrigger value="logo" data-ocid="admin.logo.tab">
              Logo & Images
            </TabsTrigger>
            <TabsTrigger value="sitetext" data-ocid="admin.sitetext.tab">
              Site Text
            </TabsTrigger>
          </TabsList>

          {/* ── Articles Tab ── */}
          <TabsContent value="articles">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-2xl text-foreground">
                Articles
              </h2>
              <Button
                data-ocid="admin.article_create_button"
                onClick={() => setShowCreateArticle(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" /> New Article
              </Button>
            </div>

            {showCreateArticle && (
              <div className="mb-8 p-6 rounded-2xl border border-border bg-card/30">
                <h3 className="font-display font-bold text-xl text-foreground mb-6">
                  Create New Article
                </h3>
                <ArticleForm
                  initial={defaultArticleForm}
                  onSubmit={handleCreateArticle}
                  onCancel={() => setShowCreateArticle(false)}
                  isPending={createArticleMutation.isPending}
                  submitLabel="Create Article"
                />
              </div>
            )}

            {articlesLoading ? (
              <div
                className="text-center py-12"
                data-ocid="admin.loading_state"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              </div>
            ) : (
              <div className="space-y-3">
                {sortedArticles.map((article, idx) => (
                  <div
                    key={article.id.toString()}
                    className="border border-border rounded-xl bg-card/30 overflow-hidden"
                  >
                    <div className="flex items-center gap-4 p-4">
                      <button
                        type="button"
                        className="flex-1 text-left flex items-center gap-4 min-w-0"
                        onClick={() =>
                          setExpandedArticleId(
                            expandedArticleId === article.id
                              ? null
                              : article.id,
                          )
                        }
                      >
                        <span className="text-xs font-mono text-muted-foreground w-6">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {article.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {article.articleType} · {article.author}
                          </p>
                        </div>
                        {expandedArticleId === article.id ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          data-ocid={`admin.article_edit_button.${idx + 1}`}
                          onClick={() => setEditingArticleId(article.id)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          data-ocid={`admin.article_delete_button.${idx + 1}`}
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteArticle(article.id)}
                          disabled={deleteArticleMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {editingArticleId === article.id && (
                      <div className="px-4 pb-4 border-t border-border pt-4">
                        <ArticleForm
                          initial={getEditArticleInitial(article)}
                          onSubmit={(data) =>
                            handleUpdateArticle(article.id, data)
                          }
                          onCancel={() => setEditingArticleId(null)}
                          isPending={updateArticleMutation.isPending}
                          submitLabel="Save Changes"
                        />
                      </div>
                    )}
                  </div>
                ))}

                {sortedArticles.length === 0 && (
                  <div
                    className="text-center py-20"
                    data-ocid="admin.empty_state"
                  >
                    <p className="text-muted-foreground">
                      No articles yet. Create one above.
                    </p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* ── Projects Tab ── */}
          <TabsContent value="projects">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-2xl text-foreground">
                Projects
              </h2>
              <Button
                data-ocid="admin.project_create_button"
                onClick={() => setShowCreateProject(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" /> New Project
              </Button>
            </div>

            {showCreateProject && (
              <div className="mb-8 p-6 rounded-2xl border border-border bg-card/30">
                <h3 className="font-display font-bold text-xl text-foreground mb-6">
                  Create New Project
                </h3>
                <ProjectForm
                  initial={defaultProjectForm}
                  onSubmit={handleCreateProject}
                  onCancel={() => setShowCreateProject(false)}
                  isPending={createProjectMutation.isPending}
                  submitLabel="Create Project"
                />
              </div>
            )}

            {projectsLoading ? (
              <div
                className="text-center py-12"
                data-ocid="admin.loading_state"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
              </div>
            ) : (
              <div className="space-y-3">
                {sortedProjects.map((project, idx) => (
                  <div
                    key={project.id.toString()}
                    className="border border-border rounded-xl bg-card/30 overflow-hidden"
                  >
                    <div className="flex items-center gap-4 p-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {project.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {project.status} · order{" "}
                          {project.displayOrder.toString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          data-ocid={`admin.project_edit_button.${idx + 1}`}
                          onClick={() =>
                            setEditingProjectId(
                              editingProjectId === project.id
                                ? null
                                : project.id,
                            )
                          }
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          data-ocid={`admin.project_delete_button.${idx + 1}`}
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteProject(project.id)}
                          disabled={deleteProjectMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {editingProjectId === project.id && (
                      <div className="px-4 pb-4 border-t border-border pt-4">
                        <ProjectForm
                          initial={getEditProjectInitial(project)}
                          onSubmit={(data) =>
                            handleUpdateProject(project.id, data)
                          }
                          onCancel={() => setEditingProjectId(null)}
                          isPending={updateProjectMutation.isPending}
                          submitLabel="Save Changes"
                        />
                      </div>
                    )}
                  </div>
                ))}

                {sortedProjects.length === 0 && (
                  <div
                    className="text-center py-20"
                    data-ocid="admin.project.empty_state"
                  >
                    <p className="text-muted-foreground">
                      No projects yet. Create one above.
                    </p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* ── Logo & Images Tab ── */}
          <TabsContent value="logo">
            <div className="max-w-lg space-y-12">
              {/* Website Logo */}
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                  Website Logo
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Current Logo</Label>
                    <div className="w-32 h-32 rounded-xl border border-border bg-card/30 flex items-center justify-center overflow-hidden">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt="Current logo"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <ImageIcon className="w-10 h-10 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">Upload New Logo</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      data-ocid="admin.logo_upload_button"
                      onClick={() => fileInputRef.current?.click()}
                      className="gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Choose Image
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Images are automatically resized for storage.
                    </p>
                  </div>

                  {logoPreview && (
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-3 block">Preview</Label>
                        <div className="w-32 h-32 rounded-xl border border-primary/40 bg-card/30 flex items-center justify-center overflow-hidden">
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          data-ocid="admin.logo_save_button"
                          onClick={handleSaveLogo}
                          disabled={setLogoMutation.isPending}
                          className="gap-2"
                        >
                          {setLogoMutation.isPending && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          )}
                          {setLogoMutation.isPending
                            ? "Saving..."
                            : "Save Logo"}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setLogoPreview(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Creator Image */}
              <div>
                <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                  Creator Image
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">Current Creator Image</Label>
                    <div
                      className="w-28 h-28 rounded-full border-2 border-border bg-card/30 flex items-center justify-center overflow-hidden"
                      style={{
                        boxShadow: "0 0 14px 2px oklch(var(--primary) / 0.2)",
                      }}
                    >
                      {creatorImageUrl ? (
                        <img
                          src={creatorImageUrl}
                          alt="Creator"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-card">
                          <User className="w-10 h-10 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">
                      Upload New Creator Image
                    </Label>
                    <input
                      ref={creatorFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCreatorImageFileChange}
                    />
                    <div className="flex gap-3 flex-wrap">
                      <Button
                        type="button"
                        variant="outline"
                        data-ocid="admin.creator_image.upload_button"
                        onClick={() => creatorFileInputRef.current?.click()}
                        className="gap-2"
                      >
                        <User className="w-4 h-4" />
                        Choose Photo
                      </Button>
                      {creatorImageUrl && (
                        <Button
                          type="button"
                          variant="outline"
                          data-ocid="admin.creator_image.delete_button"
                          onClick={handleRemoveCreatorImage}
                          disabled={setCreatorImageMutation.isPending}
                          className="gap-2 text-destructive border-destructive/40 hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove Image
                        </Button>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Shown as a circular profile photo on the About page.
                      Images are automatically resized.
                    </p>
                  </div>

                  {creatorImagePreview && (
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-3 block">Preview</Label>
                        <div
                          className="w-28 h-28 rounded-full border-2 border-primary/50 overflow-hidden"
                          style={{
                            boxShadow:
                              "0 0 14px 2px oklch(var(--primary) / 0.3)",
                          }}
                        >
                          <img
                            src={creatorImagePreview}
                            alt="Creator preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          data-ocid="admin.creator_image.save_button"
                          onClick={handleSaveCreatorImage}
                          disabled={setCreatorImageMutation.isPending}
                          className="gap-2"
                        >
                          {setCreatorImageMutation.isPending && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          )}
                          {setCreatorImageMutation.isPending
                            ? "Saving..."
                            : "Update Creator Image"}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setCreatorImagePreview(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          {/* ── Site Text Tab ── */}
          <TabsContent value="sitetext">
            <SiteTextTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
