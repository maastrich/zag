<script lang="ts">
  import StateVisualizer from "$lib/components/state-visualizer.svelte"
  import Toolbar from "$lib/components/toolbar.svelte"
  import { useControls } from "$lib/use-controls.svelte"
  import * as hoverCard from "@zag-js/hover-card"
  import { hoverCardControls } from "@zag-js/shared"
  import { normalizeProps, portal, useMachine } from "@zag-js/svelte"

  const controls = useControls(hoverCardControls)

  const id = $props.id()
  const service = useMachine(hoverCard.machine, controls.mergeProps<hoverCard.Props>({ id }))

  const api = $derived(hoverCard.connect(service, normalizeProps))
</script>

<main class="hover-card">
  <div style="display:flex; gap:50px">
    <a href="https://twitter.com/zag_js" target="_blank" {...api.getTriggerProps()}> Twitter </a>

    {#if api.open}
      <div use:portal {...api.getPositionerProps()}>
        <div {...api.getContentProps()}>
          <div {...api.getArrowProps()}>
            <div {...api.getArrowTipProps()}></div>
          </div>
          Twitter Preview
          <a href="https://twitter.com/zag_js" target="_blank"> Twitter </a>
        </div>
      </div>
    {/if}

    <div data-part="test-text">Test text</div>
  </div>
</main>

<Toolbar {controls}>
  <StateVisualizer state={service} />
</Toolbar>
