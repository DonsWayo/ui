<script lang="ts">
  // Reusable card for a Nucel-App row. Used by:
  //   - Settings/Developer/Apps/Index (developer's owned apps)
  //   - Marketplace/Index (public apps)
  //   - Org/InstalledApps (apps installed on an org)
  //
  // The data model is intentionally flat — callers pass exactly what
  // they want rendered and slot any actions (Install, Suspend, Uninstall,
  // ChevronRight, etc.) into the trailing `actions` snippet.
  //
  // `meta` and `subtitle` are optional secondary lines so each call site
  // can attach its own context (e.g. "by @owner-org · published 5d ago"
  // for marketplace; "installed as deploy-bot[bot] · 3h ago" for org).

  import { Bot } from '@lucide/svelte';
  import PermissionChips from './PermissionChips.svelte';
  import type { Snippet } from 'svelte';

  let {
    name,
    href,
    icon_url = null,
    subtitle = null,
    meta = null,
    permissions = null,
    actions,
    badges,
  }: {
    name: string;
    href?: string;
    icon_url?: string | null;
    subtitle?: string | null;
    meta?: Snippet | null;
    permissions?: Record<string, string> | null;
    actions?: Snippet;
    badges?: Snippet;
  } = $props();
</script>

<div class="flex items-start gap-3 px-4 py-4">
  <div class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-primary">
    {#if icon_url}
      <img src={icon_url} alt="" class="h-full w-full object-cover" />
    {:else}
      <Bot class="h-4 w-4" />
    {/if}
  </div>

  <div class="min-w-0 flex-1">
    <div class="flex items-center gap-2 flex-wrap">
      {#if href}
        <a class="text-sm font-medium text-foreground hover:text-primary hover:underline" {href}>{name}</a>
      {:else}
        <span class="text-sm font-medium text-foreground">{name}</span>
      {/if}
      {#if badges}{@render badges()}{/if}
    </div>
    {#if subtitle}
      <p class="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
    {/if}
    {#if meta}
      <div class="mt-1 text-[11px] text-muted-foreground">{@render meta()}</div>
    {/if}
    {#if permissions}
      <div class="mt-2">
        <PermissionChips {permissions} compact />
      </div>
    {/if}
  </div>

  {#if actions}
    <div class="flex shrink-0 flex-col items-end gap-2">
      {@render actions()}
    </div>
  {/if}
</div>
