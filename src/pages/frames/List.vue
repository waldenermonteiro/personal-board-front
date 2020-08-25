<template>
  <v-container fluid="">
    <draggable
      :move="checkMove"
      :list="framesCustom"
      :disabled="disabled"
      ghost-class="ghost"
      @start="dragging = true"
      @end="terminateMove"
      v-bind="{ group: 'frames-group' }"
    >
      <transition-group ref="scroll" class="row flex-nowrap overflow-auto" style="height:100%" type="transition" name="flip-list">
        <v-col @mouseover="disabledDraggable(false)" v-for="frame in framesCustom" :key="frame.collocation" xs="6" sm="4" md="3" class="list-group-item">
          <v-toolbar @click="enableInputUpdateFrameTitle(frame)" color="deep-purple" :dark="collocationFrame !== frame.collocation" dense>
            <v-toolbar-title v-if="collocationFrame !== frame.collocation">{{ frame.title }} </v-toolbar-title>
            <v-text-field
              v-else
              style="width: 100%"
              @blur="updateFrameTitle(frame)"
              @keyup.enter="updateFrameTitle(frame)"
              v-model="frame.title"
              ref="inputFrameTitle"
              hide-details
              solo
              dense
              placeholder="Enter a title for this frame"
              outlined
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item style="cursor:pointer" v-for="(option, i) in options" :key="i" @click="deleteFrame(frame)">
                  <v-list-item-title>{{ option.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-card class="list-group-item">
            <list-tasks :frames="framesCustom" :list="frame.tasks" :frame="frame"></list-tasks>
          </v-card>
        </v-col>
        <v-col md="3" :key="1000" @mouseover="disabledDraggable(true)">
          <v-toolbar v-if="!inputVisible" dense class="toolbar-custom" @click="enableInputCreateFrame(true)">
            <v-toolbar-title> <v-icon>mdi-plus</v-icon>Add other list</v-toolbar-title>
          </v-toolbar>
          <div v-show="inputVisible" style="background-color:#f6f6f4;padding: 8px">
            <v-text-field
              v-model="form.title"
              ref="inputCreateFrame"
              class="pb-2"
              hide-details
              solo
              dense
              placeholder="Enter a title for this frame"
              outlined
            ></v-text-field>
            <v-btn color="success" small @click="createFrame(form)">Add frame</v-btn>
            <v-btn @click="inputVisible = false" small icon><v-icon>mdi-close</v-icon></v-btn>
          </div>
        </v-col>
      </transition-group>
    </draggable>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import Draggable from 'vuedraggable'
import ListTasks from '../tasks/List'
export default {
  name: 'IndexFrames',
  display: 'Transition',
  components: {
    Draggable,
    ListTasks
  },
  data: () => ({
    options: [{ title: 'Delete Frame' }],
    framesCustom: [],
    disabled: false,
    inputVisible: false,
    form: {
      title: ''
    },
    pastFrame: {},
    presentFrame: {},
    collocationFrame: ''
  }),
  computed: {
    ...mapState('Frame', ['frames'])
  },
  watch: {
    frames: function () {
      this.framesCustom = JSON.parse(JSON.stringify(this.frames))
    }
  },
  mounted () {
    this.$list({
      urlDispatch: 'Frame/list',
      callback: () => {
        this.framesCustom = JSON.parse(JSON.stringify(this.frames))
      }
    })
  },
  methods: {
    checkMove (e) {
      this.pastFrame = e.draggedContext.element
      this.presentFrame = e.relatedContext.element
    },
    terminateMove () {
      this.updateFrames()
    },
    disabledDraggable (value) {
      this.disabled = value
    },
    enableInputCreateFrame (value) {
      this.inputVisible = value
      this.$nextTick(() => {
        this.$refs.inputCreateFrame.focus()
      })
    },
    enableInputUpdateFrameTitle (frame) {
      this.collocationFrame = frame.collocation
      this.$nextTick(() => {
        this.$refs.inputFrameTitle[0].focus()
      })
    },
    createFrame (form) {
      const frame = { ...form, collocation: this.framesCustom.length }
      this.$createOrUpdate({
        urlDispatch: 'Frame/create',
        params: frame,
        callback: () => {
          this.clearForm()
          this.enableInputCreateFrame(false)
          this.$list({
            urlDispatch: 'Frame/list',
            callback: () => {
              setTimeout(() => {
                const objDiv = this.$refs.scroll.$el
                objDiv.scrollLeft += objDiv.scrollWidth
              }, 500)
            }
          })
        }
      })
    },
    updateFrameTitle (frame) {
      this.collocationFrame = ''
      this.$createOrUpdate({
        urlDispatch: 'Frame/update',
        params: frame
      })
    },
    updateFrames () {
      for (let index = 0; index < this.framesCustom.length; index++) {
        const frame = { ...this.framesCustom[index], collocation: index }
        this.$createOrUpdate({
          urlDispatch: 'Frame/update',
          params: frame
        })
      }
    },
    deleteFrame (frame) {
      this.$remove({
        urlDispatch: 'Frame/remove',
        params: frame,
        callback: () => {
          this.$list({ urlDispatch: 'Frame/list' })
          this.clearForm()
          this.enableInputCreateFrame(false)
        }
      })
    },
    clearForm () {
      this.form.title = ''
    }
  }
}
</script>
<style>
.toolbar-custom {
  cursor: pointer !important;
  background-color: rgba(0, 0, 0, 0.08) !important;
  box-shadow: none !important;
}
.toolbar-custom:hover {
  opacity: 0.7;
}
</style>
