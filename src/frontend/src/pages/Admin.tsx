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
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  LogIn,
  LogOut,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { type Article, ArticleType } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useClaimFirstAdmin,
  useCreateArticle,
  useDeleteArticle,
  useGetArticles,
  useIsAdmin,
  useIsAdminClaimed,
  useUpdateArticle,
} from "../hooks/useQueries";

interface ArticleFormData {
  title: string;
  description: string;
  content: string[];
  articleType: ArticleType;
  author: string;
  displayOrder: string;
}

const defaultForm: ArticleFormData = {
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
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            data-ocid="admin.input"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Article title"
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
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
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={form.author}
            onChange={(e) => updateField("author", e.target.value)}
            placeholder="Author name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="displayOrder">Display Order</Label>
          <Input
            id="displayOrder"
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

export default function Admin() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: adminClaimed, isLoading: adminClaimedLoading } =
    useIsAdminClaimed();
  const { data: articles, isLoading: articlesLoading } = useGetArticles();
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();
  const deleteMutation = useDeleteArticle();
  const claimAdminMutation = useClaimFirstAdmin();

  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [expandedId, setExpandedId] = useState<bigint | null>(null);

  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  function getEditInitial(article: Article): ArticleFormData {
    return {
      title: article.title,
      description: article.description,
      content: article.content,
      articleType: article.articleType,
      author: article.author,
      displayOrder: article.displayOrder.toString(),
    };
  }

  async function handleCreate(data: ArticleFormData) {
    try {
      await createMutation.mutateAsync({
        title: data.title,
        description: data.description,
        content: data.content.filter((p) => p.trim()),
        articleType: data.articleType,
        author: data.author,
        displayOrder: BigInt(Number.parseInt(data.displayOrder) || 0),
      });
      toast.success("Article created!");
      setShowCreate(false);
    } catch {
      toast.error("Failed to create article.");
    }
  }

  async function handleUpdate(id: bigint, data: ArticleFormData) {
    try {
      await updateMutation.mutateAsync({
        id,
        title: data.title,
        description: data.description,
        content: data.content.filter((p) => p.trim()),
        articleType: data.articleType,
        author: data.author,
        displayOrder: BigInt(Number.parseInt(data.displayOrder) || 0),
      });
      toast.success("Article updated!");
      setEditingId(null);
    } catch {
      toast.error("Failed to update article.");
    }
  }

  async function handleDelete(id: bigint) {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Article deleted.");
    } catch {
      toast.error("Failed to delete article.");
    }
  }

  async function handleClaimAdmin() {
    try {
      const success = await claimAdminMutation.mutateAsync();
      if (success) {
        toast.success("Admin access granted! You are now the admin.");
      } else {
        toast.error("Admin has already been claimed by someone else.");
      }
    } catch {
      toast.error("Failed to claim admin access.");
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 rounded-2xl border border-border flex items-center justify-center mx-auto mb-6 bg-card/50">
            <img
              src="/assets/uploads/WhatsApp-Image-2026-03-14-at-11.02.13-PM-4.jpeg"
              alt="PsyQuantum"
              className="w-full h-full object-contain block"
            />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-4">
            Admin Panel
          </h1>
          <p className="text-muted-foreground mb-8">
            Login to manage articles.
          </p>
          <Button
            data-ocid="admin.login_button"
            onClick={login}
            disabled={isLoggingIn}
            size="lg"
            className="gap-2"
          >
            {isLoggingIn ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {isLoggingIn ? "Connecting..." : "Login with Internet Identity"}
          </Button>
        </div>
      </main>
    );
  }

  if (adminLoading || adminClaimedLoading) {
    return (
      <main className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <Loader2
          className="w-8 h-8 animate-spin text-primary"
          data-ocid="admin.loading_state"
        />
      </main>
    );
  }

  // Logged in but not admin
  if (!isAdmin) {
    // Admin not yet claimed -- let this user become admin
    if (!adminClaimed) {
      return (
        <main className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="w-16 h-16 rounded-2xl border border-primary/30 flex items-center justify-center mx-auto mb-6 bg-primary/10">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-4">
              Claim Admin Access
            </h1>
            <p className="text-muted-foreground mb-2">
              No admin has been set up yet. As the site owner, click below to
              claim admin access for your account.
            </p>
            <p className="text-xs text-muted-foreground mb-8">
              This can only be done once. After claiming, only your account will
              have admin privileges.
            </p>
            <div className="flex flex-col gap-3 items-center">
              <Button
                data-ocid="admin.claim_button"
                onClick={handleClaimAdmin}
                disabled={claimAdminMutation.isPending}
                size="lg"
                className="gap-2"
              >
                {claimAdminMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ShieldCheck className="w-4 h-4" />
                )}
                {claimAdminMutation.isPending
                  ? "Claiming..."
                  : "Claim Admin Access"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clear}
                className="gap-2 text-muted-foreground"
              >
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>
          </div>
        </main>
      );
    }

    // Admin already claimed by someone else
    return (
      <main className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="font-display font-bold text-3xl text-foreground mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground mb-8">
            You do not have admin privileges.
          </p>
          <Button variant="outline" onClick={clear} className="gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </main>
    );
  }

  const sortedArticles = [...(articles ?? [])].sort(
    (a, b) => Number(a.displayOrder) - Number(b.displayOrder),
  );

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-primary font-mono text-sm mb-2">{"// admin"}</p>
            <h1 className="font-display font-bold text-4xl text-foreground">
              Article Management
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              data-ocid="admin.create_button"
              onClick={() => setShowCreate(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" /> New Article
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={clear}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {showCreate && (
          <div className="mb-8 p-6 rounded-2xl border border-border bg-card/30">
            <h2 className="font-display font-bold text-xl text-foreground mb-6">
              Create New Article
            </h2>
            <ArticleForm
              initial={defaultForm}
              onSubmit={handleCreate}
              onCancel={() => setShowCreate(false)}
              isPending={createMutation.isPending}
              submitLabel="Create Article"
            />
          </div>
        )}

        {articlesLoading ? (
          <div className="text-center py-12" data-ocid="admin.loading_state">
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
                      setExpandedId(
                        expandedId === article.id ? null : article.id,
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
                    {expandedId === article.id ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      data-ocid={`admin.edit_button.${idx + 1}`}
                      onClick={() => setEditingId(article.id)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      data-ocid={`admin.delete_button.${idx + 1}`}
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(article.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {editingId === article.id && (
                  <div className="px-4 pb-4 border-t border-border pt-4">
                    <ArticleForm
                      initial={getEditInitial(article)}
                      onSubmit={(data) => handleUpdate(article.id, data)}
                      onCancel={() => setEditingId(null)}
                      isPending={updateMutation.isPending}
                      submitLabel="Save Changes"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!articlesLoading && sortedArticles.length === 0 && (
          <div className="text-center py-20" data-ocid="admin.empty_state">
            <p className="text-muted-foreground">
              No articles yet. Create one above.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
