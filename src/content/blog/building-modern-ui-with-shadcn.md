---
title: "Building Modern UI with shadcn/ui: A Developer's Guide"
description: "Discover how to create beautiful, accessible, and customizable user interfaces using shadcn/ui components and Tailwind CSS."
date: "2025-01-10"
author: "Yash"
tags: ["shadcn", "ui", "tailwind", "react", "design-system"]
---

# Building Modern UI with shadcn/ui: A Developer's Guide

Creating beautiful and consistent user interfaces has never been easier thanks to shadcn/ui. This comprehensive component library combines the power of Radix UI primitives with the flexibility of Tailwind CSS.

## What is shadcn/ui?

shadcn/ui is not just another component library. It's a collection of copy-and-paste components that you can use to build your own component system. Built on top of:

- **Radix UI**: For accessibility and unstyled components
- **Tailwind CSS**: For styling and customization
- **Class Variance Authority (CVA)**: For component variants
- **TypeScript**: For type safety

## Getting Started

### Installation

First, set up shadcn/ui in your project:

```bash
npx shadcn-ui@latest init
```

This command will:
- Install required dependencies
- Create a `components.json` config file
- Set up your `tailwind.config.js`
- Configure CSS variables for theming

### Adding Components

Add components as needed:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
```

## Key Features

### 1. Customizable Components

Every component is fully customizable:

```tsx
import { Button } from "@/components/ui/button"

export function CustomButton() {
  return (
    <div className="space-x-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}
```

### 2. Dark Mode Support

Built-in dark mode support with CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... more variables */
}
```

### 3. Accessible by Default

All components are built with accessibility in mind:

```tsx
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog"

export function AccessibleDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Open Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Confirm Action</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Are you sure?
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

## Building Complex Components

### Form Components

Create sophisticated forms with validation:

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Data Tables

Build powerful data tables:

```tsx
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

type User = {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
]

export function UsersTable({ data }: { data: User[] }) {
  return <DataTable columns={columns} data={data} />
}
```

## Theming and Customization

### CSS Variables

Customize your theme by modifying CSS variables:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
}
```

### Component Variants

Create custom variants using CVA:

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

## Best Practices

### 1. Composition Over Inheritance

Build complex components by composing simpler ones:

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ProjectCard({ project }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{project.title}</CardTitle>
          <Badge variant="secondary">{project.status}</Badge>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button size="sm">View</Button>
          <Button variant="outline" size="sm">Edit</Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

### 2. Consistent Spacing

Use Tailwind's spacing scale consistently:

```tsx
<div className="space-y-6">
  <div className="space-y-2">
    <h2 className="text-2xl font-bold">Section Title</h2>
    <p className="text-muted-foreground">Section description</p>
  </div>
  <div className="grid gap-4 md:grid-cols-2">
    {/* Content */}
  </div>
</div>
```

### 3. Responsive Design

Make components responsive from the start:

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => (
    <Card key={item.id} className="p-6">
      {/* Card content */}
    </Card>
  ))}
</div>
```

## Conclusion

shadcn/ui provides an excellent foundation for building modern, accessible, and beautiful user interfaces. Its approach of copy-and-paste components gives you full control while maintaining consistency and quality.

The combination of Radix UI primitives, Tailwind CSS styling, and TypeScript safety makes it an ideal choice for React applications of any scale.

Start building your next project with shadcn/ui and experience the difference of well-crafted components! 