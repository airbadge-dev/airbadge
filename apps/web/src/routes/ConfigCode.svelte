<script>
  export let step
</script>

<div class="container code">
  <div class="line">
    <span class="keyword">import</span> {'{'} SvelteKitAuth } <span class="keyword">from</span> '@airbadge/sveltekit'
  </div>

  <br />

  <div class="line">
    <span class="keyword">export const</span> handle = SvelteKitAuth({'{'}
  </div>

  {#if step != 'init'}
    <div class="highlight">
      &nbsp;&nbsp;<span class="keyword highlight-inline">adapter</span>: PrismaAdapter(...){#if step == 'provider' || step == 'pricing'},{/if}
      <br />
    </div>
  {/if}

  {#if step == 'provider' || step == 'pricing'}
    <div class="highlight">
      <br />
      &nbsp;&nbsp;<span class="keyword highlight-inline">providers</span>: [
      <br />
      <div class="line">&nbsp;&nbsp;&nbsp;&nbsp;Google(...),</div>
      <div class="line">&nbsp;&nbsp;&nbsp;&nbsp;Apple(...),</div>
      &nbsp;&nbsp;]{#if step == 'pricing'},{/if}
      <br />
    </div>
  {/if}

  {#if step == 'pricing'}
    <div class="highlight">
      <br />

      &nbsp;&nbsp;<span class="keyword highlight-inline">plans</span>: [
      <br />
      <div class="line">
        &nbsp;&nbsp;&nbsp;&nbsp;{'{'} id: "basic", priceId: 'price_X213DS3'},
      </div>
      <div class="line">
        &nbsp;&nbsp;&nbsp;&nbsp;{'{'} id: "pro", priceId: 'price_4F32FA6'}
      </div>
      &nbsp;&nbsp;]
      <br />
    </div>
  {/if}

  <div class="line">})</div>
</div>
