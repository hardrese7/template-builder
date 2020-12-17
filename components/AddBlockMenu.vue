<template>
  <b-dropdown class="add-new-block">
    <b-button slot="trigger" type="is-primary" icon-left="plus"
      >Добавить новый блок</b-button
    >
    <b-dropdown-item has-link icon-left="plus">
      <nuxt-link to="/add-block/text">Текст</nuxt-link>
    </b-dropdown-item>
    <b-dropdown-item>
      <nuxt-link to="/add-block/image">Изображение</nuxt-link>
    </b-dropdown-item>
  </b-dropdown>
</template>

<style scoped lang="scss">
.add-new-block {
  position: sticky;
  margin-bottom: 10px;
  align-self: flex-end;
  z-index: 2;
}
</style>
