<script>
  import { showPageContent } from '../api/store.js';
    
</script>
  
<style global lang="scss">
  @import "../styles/base/_all.scss";

  .page-content {
    display: grid;
    gap: $margin-default;
    padding: $margin-default;
  }
  
  .page-content.hide {
    max-height: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  
  </style>
  
  <div class="page-content" class:hide={ !$showPageContent }>
    <slot/>
  </div>