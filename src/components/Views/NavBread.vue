<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <span>
          <slot name="Bread"></slot>
          <slot name="Bread2"></slot>
        </span>
      </nav>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NavBread"
    }
</script>
