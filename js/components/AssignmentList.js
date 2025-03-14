import Assignment from "./Assignment.js";
import AssignmentTags from "./AssignmentTags.js";
import Panel from "./Panel.js";
export default {
    components: { Assignment, AssignmentTags, Panel },
    template: `
            <panel v-show="assignments.length" >
            <div class="flex justify-between items-start">
                <h2 class="font-bold mb-2">
                    {{ title }}
                    <span>({{ assignments.length }})</span>
                </h2>
                <button v-show="canToggle" @click="$emit('toggle')">&times;</button>
            </div>
            
            <assignment-tags
            :initial-tags="assignments.map(a => a.tag)"
            v-model:currentTag="currentTag"
            ></assignment-tags>

            <ul class="border border-gray-600 divide-y divide-gray-600 mt-6">
                <assignment
                v-for="assignment in filteredAssignments"
                :key="assignment.id"
                :assignment="assignment"
                ></assignment>
            </ul>
            
            <slot></slot>
            
            <template #footer>
                This is footer section
            </template>     
            
        </panel>

    `,

    data() {
        return {
            currentTag: 'all',
        }
    },

    props: {
        assignments: Array,
        title: String,
        canToggle: { type: Boolean, default: false }
    },

    computed: {
        filteredAssignments() {
            if(this.currentTag === 'all')
                return this.assignments;
            return this.assignments.filter(a => a.tag === this.currentTag);
        },
    }
}