<template>
  <span v-html="styleOutput"></span>
</template>

<script>
export default {
  props: {
    headers: { required: true, type: Array },
    cssClass: { required: true, type: String },
    maxWidth: { required: false, type: String, default: "600px" },
  },
  computed: {
    styleOutput() {
      let result = "";
      if (this.headers.length === 0) return result;
      this.headers.forEach((element, index) => {
        result +=
          ".v-data-table." +
          this.cssClass +
          " td:nth-child(" +
          (index + 1) +
          ')::before { content:"' +
          element.title +
          '"; display:none; }' +
          "\n";
      });

      result +=
        `
    @media (max-width:` +
        this.maxWidth +
        `) {
    .v-data-table.` +
        this.cssClass +
        ` thead { border: none; clip: rect(0 0 0 0); height: 1px; margin: -1px; overflow: hidden; padding: 0; position: absolute; width: 1px; }
    .v-data-table.` +
        this.cssClass +
        ` td { padding: .5em .5em .5em 8em !important; position:relative; border-bottom: none !important; display: block; text-align: left !important; width:100%; height:auto !important; }
    .v-data-table.` +
        this.cssClass +
        ` td.v-data-table__td::before { display:block; position:absolute; left:0; font-weight: bold; width: 8em; text-align: right; padding-right: 0.5em; }
    .v-data-table.` +
        this.cssClass +
        ` td:last-child { border-bottom: 0; }
    .v-data-table.` +
        this.cssClass +
        ` tr:not(:first-child) > td:first-child { border-top: medium solid rgba(var(--v-border-color), var(--v-border-opacity)); }
}
            `;

      //console.log('style on v-data-table "'+this.cssClass+'" added:'); console.log(result.trim());
      return "<style>" + result.trim() + "</style>";
    },
  },
};
</script>
