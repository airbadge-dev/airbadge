<div class="container code">
  <div class="line">
    <span class="keyword">export async function</span> load({'{'} locals }) {'{'}
  </div>

  <div class="highlight">
    <div class="line">
      &nbsp;&nbsp;<span class="keyword">const</span> <span>session</span>
      = <span class="keyword">await</span> locals.getSession()
    </div>

    <br />

    <div class="line">
      &nbsp;&nbsp;if (<span class="highlight-inline">session.subscription?.status</span>
      == 'active') {'{'}
    </div>

    <div class="line comment">&nbsp;&nbsp;&nbsp;&nbsp;// do the thing</div>

    <div class="line">&nbsp;&nbsp;}</div>
  </div>

  <div class="line">})</div>
</div>
