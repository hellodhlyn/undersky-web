<template>
  <div id="game-submission" class="container">
    <h1>소스코드 제출</h1>
    <div id="submission-info" class="divided container">
      <h2>제출 정보</h2>
      <div class="info-item">
        <span class="label">실행 환경</span>
        <span class="dropdown"><icon-text text="Python 3.6" icon="arrow-dropdown" position="right"/></span>
      </div>
    </div>

    <codemirror id="code-editor" v-model="code" :options="cmOptions" />
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';

// Languages
import 'codemirror/mode/python/python.js';

// Themes
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-light.css';

// Add-ons
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/selection/active-line.js';

export default {
  components: { codemirror },
  data() {
    return {
      code: 'print(\'Hello, world!\')',
      cmOptions: {
        mode: 'text/x-python',
        theme: 'base16-light',
        autoCloseBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        line: true,
        lineNumbers: true,
        styleActiveLine: true,
      },
    };
  },
};
</script>


<style lang="scss" scoped>
h1 {
  text-align: center;
}

#submission-info {
  h2 { margin: 10px 0; }

  .info-item {
    span {
      padding: 10px 0;

      &.label {
        display: inline-block;
        width: 120px;
        font-weight: bold;
      }

      &.dropdown {
        padding-left: 10px;
        padding-right: 10px;
        display: inline-block;
        width: calc(100% - 140px);
        
        ion-icon { vertical-align: center; }
        &:hover { background: #f5f5f5; }
      }
    }

    &:not(:last-of-type) { border-bottom: 1px solid #e0e0e0; }
  }
}

#code-editor {
  margin: 20px 0;
}
</style>
