export function generateBookmarkletCode(baseUrl: string): string {
  const base = baseUrl.replace(/\/$/, "");

  // Each statement on one line joined directly — no whitespace collapsing needed.
  // Drops window.open features arg to avoid popup blockers.
  const parts = [
    `void(function(){`,
    `var u=encodeURIComponent(location.href);`,
    `var t=encodeURIComponent(document.title||'');`,
    `var m=document.querySelector('meta[name="description"]');`,
    `var d=encodeURIComponent((window.getSelection&&window.getSelection().toString())||(m&&m.getAttribute('content'))||'');`,
    `var l=document.querySelector('link[rel*="icon"]');`,
    `var h=(l&&l.href)||'';`,
    `var f=h.indexOf('data:')===0?'':encodeURIComponent(h||location.origin+'/favicon.ico');`,
    `window.open('${base}/add?url='+u+'&title='+t+'&description='+d+(f?'&favicon='+f:''));`,
    `}())`,
  ];

  return `javascript:${parts.join("")}`;
}
