import { defineField, defineType } from "sanity";

export const note = defineType({
  name: "note",
  title: "Note",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 12,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "createdAt" },
  },
});
