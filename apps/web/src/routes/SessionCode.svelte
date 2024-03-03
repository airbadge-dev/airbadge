<div class="container">
  <div class="line">
    export async function load({'{'} locals }) {'{'}
  </div>

  <div class="highlight">
    <div class="line">
      &nbsp;&nbsp;const <span class="keyword">session</span>
       = await locals.getSession()
    </div>

    <br />

    <div class="line">
      &nbsp;&nbsp;if (<span class="keyword">session.subscription?.status</span>
      == 'active') {'{'}
    </div>

    <div class="line comment">&nbsp;&nbsp;&nbsp;&nbsp;// do the thing</div>

    <div class="line">&nbsp;&nbsp;}</div>
  </div>

  <div class="line">})</div>
</div>
