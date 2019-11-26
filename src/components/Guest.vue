<template>
  <v-flex xs12>
    <p class="font-weight-bold mb-1">Guest</p>
    <v-menu
      v-model="guest_menu"
      :close-on-content-click="false"
      transition="slide-y-transition"
      bottom
      offset-y
      dark
      style="background:#191C21"
    >
      <v-text-field
        slot="activator"
        placeholder="Guests"
        v-model="guests_text"
        single-line
        hide-details
        solo
        flat
        append-icon="keyboard_arrow_down"
        class="input-text-field-slim"
      />

      <v-list>
        <v-list-item
          v-for="(item, i) in guest_categories"
          :key="i"
          class="my-2"
        >
          <v-list-item-content>
            <v-list-item-title v-html="item.title" class="font-weight-bold" />
            <v-list-item-subtitle v-html="item.subtitle" />
          </v-list-item-content>
          <v-spacer/>
          <v-list-item-action>
            <v-layout
              row
              align-center
              justify-space-around
            >
              <v-flex>
                <v-btn
                  outlined
                  fab
                  small
                  :disabled="item.amount === 0"
                  color="teal darken-4"
                  class="calculateBtn"
                  @click="removeGuest(i)"
                >
                  <v-icon>remove</v-icon>
                </v-btn>
              </v-flex>
              <v-flex class="amount">
                <div class="px-3 font-weight-bold">{{ item.amount }}</div>
              </v-flex>
              <v-flex>
                <v-btn
                  outlined
                  fab
                  small
                  color="teal darken-4"
                  class="calculateBtn"
                  @click="addGuest(i)">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-spacer/>
          <v-list-item-action>
            <v-btn
              text
              color="teal darken-4"
              :ripple="false"
              class="text-capitalize font-weight-bold subheading"
              @click="renderGuestNumber"
            >Apply</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    guest_menu: false,
    guest_categories: [
      {
        title: 'Adults',
        amount: 0,
      },
      {
        title: 'Children',
        subtitle: 'Ages 2-12',
        amount: 0,
      },
      {
        title: 'Infants',
        subtitle: 'Under 2',
        amount: 0,
      },
    ],
    guests_text: '',
  }),
  methods: {
    addGuest(index) {
      this.guest_categories[index].amount += 1;
      if (
        (index === 1 || index === 2) &&
        this.guest_categories[index - 1].amount === 0
      ) {
        this.guest_categories[index - 1].amount += 1;
      }
    },
    removeGuest(index) {
      if (this.guest_categories[index].amount) {
        this.guest_categories[index].amount -= 1;
      }
    },
    renderGuestNumber() {
      this.guests_text =
        this.guest_categories[0].amount +
        this.guest_categories[1].amount +
        ' guest(s)';
      if (this.guest_categories[2].amount > 0) {
        this.guests_text =
          this.guests_text +
          ', ' +
          this.guest_categories[2].amount +
          ' infant(s)';
      }
      this.guest_menu = false;
    },
  },
}
</script>

<style>

</style>
