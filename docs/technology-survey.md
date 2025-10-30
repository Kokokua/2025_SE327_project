# Technology Survey & Selection Report

## Executive Summary
This document presents the comprehensive survey of technology options for reengineering the SE262 bookstore project, including detailed comparison and rationale for final selections.

---

## 1. Frontend Framework Survey

### Evaluation Criteria
| Criterion | Weight | Description |
|-----------|--------|-------------|
| **Learning Curve** | 30% | Time required for team to become productive |
| **Performance** | 20% | Runtime performance and bundle size |
| **Ecosystem** | 25% | Available libraries, tools, and community support |
| **Team Fit** | 25% | Alignment with team's existing skills and project timeline |

---

### Option 1: Vue.js 3

#### Overview
Progressive JavaScript framework for building user interfaces, known for its gentle learning curve and comprehensive documentation.

#### Technical Specifications
- **Version:** 3.3.4 (latest stable)
- **Type System:** JavaScript with TypeScript support
- **Bundle Size:** 41KB (gzipped with runtime + compiler)
- **License:** MIT

#### Strengths
1. **Learning Curve (9/10)**
   - Intuitive template syntax similar to HTML
   - Clear separation of concerns (template, script, style)
   - Excellent documentation with Thai language support
   - Gradual adoption - can start simple and scale up
   - Composition API provides clean, reusable logic

2. **Performance (9/10)**
   - Virtual DOM with efficient diff algorithm
   - Compiler-optimized templates
   - Tree-shaking friendly
   - Lazy loading support out of the box
   - Bundle size: ~33KB (runtime-only)

3. **Ecosystem (7/10)**
   - **State Management:** Pinia (modern, intuitive)
   - **Routing:** Vue Router (official, mature)
   - **UI Libraries:** Vuetify 3, Element Plus, Quasar
   - **Build Tools:** Vite (official, extremely fast)
   - **DevTools:** Vue DevTools (excellent debugging)
   - **Community:** Large, active, helpful

4. **Developer Experience**
   - Single File Components (.vue) are intuitive
   - Hot Module Replacement is instant
   - Error messages are clear and helpful
   - TypeScript support is improving rapidly

#### Weaknesses
1. Smaller ecosystem compared to React
2. Fewer job opportunities than React
3. Some enterprise tools have React-first support
4. Community in Thailand is smaller than React

#### Use Cases & Fit
- ✅ Perfect for: E-commerce, dashboards, SPAs
- ✅ Team has limited time (1 month)
- ✅ Need quick prototyping
- ⚠️ May lack some specialized libraries

#### Example Code (Composition API)
```vue
<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const quantity = ref(1)

const total = computed(() => 
  cartStore.items.reduce((sum, item) => sum + item.price * item.qty, 0)
)

function addToCart(book) {
  cartStore.addItem(book, quantity.value)
}
</script>

<template>
  <div class="book-card">
    <h3>{{ book.title }}</h3>
    <p>{{ book.price }} บาท</p>
    <button @click="addToCart(book)">เพิ่มลงตะกร้า</button>
  </div>
</template>
```

#### Score: 8.5/10

---

### Option 2: React 18

#### Overview
Popular JavaScript library for building user interfaces, maintained by Meta (Facebook) with the largest ecosystem.

#### Technical Specifications
- **Version:** 18.2.0 (latest)
- **Type System:** JavaScript with excellent TypeScript support
- **Bundle Size:** 44KB (gzipped with React DOM)
- **License:** MIT

#### Strengths
1. **Learning Curve (6/10)**
   - Hooks can be confusing for beginners
   - useEffect requires deep understanding
   - Many ways to do the same thing
   - Mental model shift from traditional web dev
   - Excellent tutorials and courses available

2. **Performance (8/10)**
   - Virtual DOM with Fiber reconciliation
   - Concurrent features (Suspense, Transitions)
   - Server Components (Next.js 13+)
   - Automatic batching
   - React Compiler (experimental) optimizes automatically

3. **Ecosystem (10/10)**
   - **State Management:** Redux Toolkit, Zustand, Jotai, Recoil
   - **Routing:** React Router, TanStack Router
   - **UI Libraries:** Material-UI, Ant Design, Chakra UI, shadcn/ui
   - **Data Fetching:** TanStack Query, SWR, Apollo
   - **Meta-frameworks:** Next.js, Remix, Gatsby
   - **DevTools:** React DevTools (excellent)
   - **Community:** Largest in JavaScript ecosystem

4. **Developer Experience**
   - JSX is powerful but takes time to learn
   - Large selection of libraries (can be overwhelming)
   - TypeScript support is excellent
   - Hot reload sometimes unstable

#### Weaknesses
1. High learning curve for hooks and mental model
2. Need to choose many libraries yourself
3. Boilerplate code can be verbose
4. useEffect pitfalls and cleanup issues
5. No official state management (have to choose)

#### Use Cases & Fit
- ✅ Perfect for: Large applications, teams already using React
- ⚠️ Team learning time: 2-3 weeks minimum
- ⚠️ Many decisions to make (analysis paralysis)
- ✅ Best long-term job market

#### Example Code (Hooks)
```jsx
import { useState, useEffect } from 'react'
import { useCartStore } from '@/stores/cart'

function BookCard({ book }) {
  const [quantity, setQuantity] = useState(1)
  const addToCart = useCartStore(state => state.addItem)
  
  useEffect(() => {
    // Need to understand cleanup
    return () => {
      // Cleanup logic
    }
  }, [/* dependencies */])
  
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.price} บาท</p>
      <button onClick={() => addToCart(book, quantity)}>
        เพิ่มลงตะกร้า
      </button>
    </div>
  )
}
```

#### Score: 7.5/10

---

### Option 3: Svelte/SvelteKit

#### Overview
Compiler-based framework that shifts work from runtime to build time, resulting in tiny bundles and fast performance.

#### Technical Specifications
- **Version:** 4.2.0 (Svelte 5 in beta)
- **Type System:** JavaScript with TypeScript support
- **Bundle Size:** 1.6KB (gzipped)
- **License:** MIT

#### Strengths
1. **Learning Curve (10/10)**
   - Closest to vanilla HTML/CSS/JS
   - No virtual DOM concept to learn
   - Minimal boilerplate
   - Reactive by default ($: syntax)
   - Easy to understand mental model

2. **Performance (10/10)**
   - No virtual DOM overhead
   - Compile-time optimizations
   - Smallest bundle size
   - Near-native performance
   - Automatic code splitting

3. **Ecosystem (5/10)**
   - **State Management:** Built-in (stores)
   - **Routing:** SvelteKit (official)
   - **UI Libraries:** Limited (Svelte Material UI, Carbon Components)
   - **Community:** Smaller but passionate
   - **Meta-framework:** SvelteKit (excellent)

4. **Developer Experience**
   - Write less code
   - Intuitive reactivity
   - Scoped styles by default
   - Fast compilation
   - Great error messages

#### Weaknesses
1. Small community means fewer resources
2. Limited third-party libraries
3. Fewer job opportunities
4. Less battle-tested in production
5. Svelte 5 (Runes) is coming - API changes

#### Use Cases & Fit
- ✅ Perfect for: Small to medium projects, performance-critical apps
- ✅ Fastest learning curve
- ⚠️ Limited component libraries
- ⚠️ Smaller community in Thailand

#### Example Code
```svelte
<script>
  import { cartStore } from '@/stores/cart'
  
  export let book
  let quantity = 1
  
  $: total = $cartStore.items.reduce((sum, item) => 
    sum + item.price * item.qty, 0
  )
  
  function addToCart() {
    cartStore.addItem(book, quantity)
  }
</script>

<div class="book-card">
  <h3>{book.title}</h3>
  <p>{book.price} บาท</p>
  <button on:click={addToCart}>เพิ่มลงตะกร้า</button>
</div>

<style>
  /* Automatically scoped */
  .book-card {
    padding: 1rem;
  }
</style>
```

#### Score: 7.5/10

---

### Frontend Comparison Table

| Criteria | Vue.js 3 | React 18 | Svelte | Weight |
|----------|----------|----------|--------|--------|
| **Learning Curve** | 9 | 6 | 10 | 30% |
| **Performance** | 9 | 8 | 10 | 20% |
| **Ecosystem** | 7 | 10 | 5 | 25% |
| **Team Fit** | 9 | 7 | 6 | 25% |
| **Weighted Score** | **8.5** | **7.5** | **7.5** | 100% |

#### Raw Scores Breakdown
- **Vue.js 3:** (9×0.3) + (9×0.2) + (7×0.25) + (9×0.25) = **8.5**
- **React 18:** (6×0.3) + (8×0.2) + (10×0.25) + (7×0.25) = **7.5**
- **Svelte:** (10×0.3) + (10×0.2) + (5×0.25) + (6×0.25) = **7.5**

---

### Frontend Selection: **Vue.js 3** ✅

#### Rationale
1. **Best balance** between learning curve and capability
2. **Perfect timeline fit** - team can be productive in 1 week
3. **Sufficient ecosystem** for e-commerce requirements
4. **Thai documentation** available for quick reference
5. **Vuetify 3** provides ready-to-use components
6. **Vite** offers instant HMR and fast builds
7. **Team consensus** based on learning curve

#### Why not React?
- Learning curve too steep for 1-month timeline
- useEffect and hooks complexity would slow development
- Need to choose too many libraries (state, UI, forms)

#### Why not Svelte?
- Limited UI component libraries (would need custom components)
- Smaller community = harder to find solutions
- Less relevant for job market

---

## 2. Backend Framework Survey

### Evaluation Criteria
| Criterion | Weight | Description |
|-----------|--------|-------------|
| **Type Safety** | 30% | Compile-time error checking |
| **Architecture** | 25% | Code organization and maintainability |
| **Documentation** | 15% | Quality of docs and learning resources |
| **Team Experience** | 30% | Existing team knowledge |

---

### Option 1: NestJS (TypeScript) ⭐ SELECTED

#### Overview
Progressive Node.js framework for building efficient, scalable server-side applications, heavily inspired by Angular.

#### Technical Specifications
- **Version:** 10.2.0 (latest)
- **Language:** TypeScript (required)
- **Architecture:** Modular, Dependency Injection
- **License:** MIT

#### Strengths
1. **Type Safety (10/10)**
   - Full TypeScript enforcement
   - DTOs with class-validator
   - Compile-time error catching
   - IntelliSense support
   - Interface-first development

2. **Architecture (10/10)**
   - Modular structure (modules, controllers, services)
   - Dependency Injection (testable, maintainable)
   - Decorators for clean code
   - Clear separation of concerns
   - Scalable patterns built-in

3. **Documentation (9/10)**
   - Excellent official documentation
   - Many real-world examples
   - Active community
   - Video tutorials available
   - Recipes for common patterns

4. **Built-in Features**
   - **Validation:** class-validator (automatic)
   - **ORM:** TypeORM, Prisma, Mongoose
   - **Auth:** Passport integration
   - **Testing:** Jest (built-in)
   - **API Docs:** Swagger (auto-generated)
   - **WebSockets:** Socket.io support
   - **Microservices:** gRPC, MQTT, Redis
   - **CLI:** Code generation

5. **Developer Experience**
   - `nest g module/controller/service` generates boilerplate
   - Hot reload with webpack
   - Clear error messages
   - TypeScript benefits throughout

#### Weaknesses
1. Steeper learning curve (DI, decorators)
2. More boilerplate than simpler frameworks
3. Larger bundle size than Express
4. Opinionated structure (pro and con)

#### Team Experience: 10/10
- **เคยเรียนมาแล้ว** - critical advantage
- Familiar with decorators and DI
- Know the mental model
- Can be productive immediately

#### Use Cases & Fit
- ✅ Perfect for: Enterprise apps, APIs, microservices
- ✅ Team already knows it
- ✅ Built-in Swagger = easy frontend collaboration
- ✅ TypeScript safety reduces bugs

#### Example Code
```typescript
// book.entity.ts
@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}

// create-book.dto.ts
export class CreateBookDto {
  @IsString()
  @ApiProperty({ example: 'The Great Gatsby' })
  title: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 350 })
  price: number;

  @IsOptional()
  @IsArray()
  @ApiProperty({ example: [1, 2, 3], required: false })
  tagIds?: number[];
}

// books.service.ts
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async findAll(filterDto: FilterBookDto): Promise<Book[]> {
    const query = this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.tags', 'tag');

    if (filterDto.search) {
      query.andWhere('book.title LIKE :search', {
        search: `%${filterDto.search}%`,
      });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!book) {
      throw new NotFoundException(`Book #${id} not found`);
    }

    return book;
  }
}

// books.controller.ts
@ApiTags('books')
@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  findAll(@Query() filterDto: FilterBookDto) {
    return this.booksService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by ID' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create book (Admin only)' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }
}
```

#### Score: 9.7/10

---

### Option 2: FastAPI (Python)

#### Overview
Modern, fast Python web framework for building APIs with automatic OpenAPI documentation.

#### Technical Specifications
- **Version:** 0.104.1
- **Language:** Python 3.7+
- **Type System:** Type hints (optional but recommended)
- **License:** MIT

#### Strengths
1. **Type Safety (8/10)**
   - Python type hints
   - Pydantic validation
   - Runtime validation
   - Less strict than TypeScript

2. **Architecture (7/10)**
   - Clean but not enforced
   - Need to organize yourself
   - Dependency injection available
   - Can get messy in large projects

3. **Documentation (9/10)**
   - Excellent official docs
   - Auto-generated OpenAPI docs
   - Many tutorials
   - Active community

4. **Features**
   - **Validation:** Pydantic (excellent)
   - **ORM:** SQLAlchemy, Tortoise
   - **Auth:** Various packages
   - **Async:** Native support
   - **Performance:** Very fast

#### Weaknesses
1. Team needs to learn Python
2. Different ecosystem from frontend
3. ORM choice required
4. Less structured than NestJS

#### Team Experience: 5/10
- Not familiar with Python for web
- Would need time to learn
- Syntax is easy but ecosystem is different

#### Score: 6.8/10

---

### Option 3: Django REST Framework (Python)

#### Overview
Powerful and flexible toolkit for building Web APIs on top of Django.

#### Technical Specifications
- **Version:** 3.14.0
- **Language:** Python 3.6+
- **Type System:** Python type hints (optional)
- **License:** BSD

#### Strengths
1. **Type Safety (6/10)**
   - Python type hints optional
   - Mostly runtime validation
   - Less type safety than TypeScript

2. **Architecture (8/10)**
   - Very opinionated (MTV pattern)
   - Clear structure
   - Models, Serializers, Views
   - Can be heavy for APIs only

3. **Documentation (8/10)**
   - Comprehensive docs
   - Large community
   - Many tutorials
   - Well established

4. **Features**
   - **Batteries included:** Admin, ORM, Auth, etc.
   - **ORM:** Django ORM (excellent)
   - **Validation:** Serializers
   - **Auth:** Built-in + JWT packages

#### Weaknesses
1. Heavy for API-only projects
2. Learning curve for Django way
3. Team needs Python knowledge
4. Monolithic approach

#### Team Experience: 4/10
- No Django experience
- Would take time to learn
- Different from current stack

#### Score: 6.3/10

---

### Backend Comparison Table

| Criteria | NestJS | FastAPI | Django REST | Weight |
|----------|--------|---------|-------------|--------|
| **Type Safety** | 10 | 8 | 6 | 30% |
| **Architecture** | 10 | 7 | 8 | 25% |
| **Documentation** | 9 | 9 | 8 | 15% |
| **Team Experience** | 10 | 5 | 4 | 30% |
| **Weighted Score** | **9.7** | **6.8** | **6.3** | 100% |

#### Raw Scores Breakdown
- **NestJS:** (10×0.3) + (10×0.25) + (9×0.15) + (10×0.3) = **9.7**
- **FastAPI:** (8×0.3) + (7×0.25) + (9×0.15) + (5×0.3) = **6.8**
- **Django REST:** (6×0.3) + (8×0.25) + (8×0.15) + (4×0.3) = **6.3**

---

### Backend Selection: **NestJS** ✅

#### Rationale
1. **Team already learned it** - Huge advantage (30% weight)
2. **TypeScript consistency** - Same language as frontend (if using TS)
3. **Full type safety** - Catch errors at compile time
4. **Auto Swagger docs** - Frontend team can see API easily
5. **Clear architecture** - Maintainable code structure
6. **Built-in everything** - Validation, testing, auth patterns
7. **Enterprise-grade** - Scalable patterns from the start

#### Why not FastAPI?
- Team would need to learn Python (2+ weeks)
- Different ecosystem from frontend TypeScript
- Less team familiarity = more development time
- Good choice if team knew Python already

#### Why not Django REST?
- Heavy for API-only project
- Python learning curve
- Opinionated in ways different from modern SPA patterns
- Better for full-stack Django projects

---

## 3. Technology Stack Compatibility

### Vue.js 3 + NestJS Integration

#### Communication
```
Frontend (Vue.js 3)  →  HTTP/JSON  →  Backend (NestJS)
   ↓                                       ↓
Axios Client                         REST API + Swagger
   ↓                                       ↓
Pinia Stores                         TypeORM + MySQL
```

#### Advantages of This Stack
1. **TypeScript Throughout** (Optional)
   - Can use TypeScript in Vue
   - Shared types between frontend and backend
   - End-to-end type safety

2. **Excellent Developer Experience**
   - Vite (frontend) + NestJS (backend) both have fast reloads
   - Swagger docs make API integration easy
   - Vue DevTools + NestJS debugging

3. **Modern Best Practices**
   - Component-based UI (Vue)
   - Modular backend (NestJS)
   - API-first design
   - JWT authentication

4. **Team Productivity**
   - Vue: Quick to learn
   - NestJS: Already familiar
   - Can work in parallel (Swagger contract)

#### Potential Challenges
1. **CORS Configuration**
   - Solution: Properly configured in NestJS
   
2. **Authentication Flow**
   - Solution: JWT tokens with Axios interceptors
   
3. **State Synchronization**
   - Solution: Pinia stores + API services layer

---

## 4. Final Recommendations

### Selected Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Frontend Framework** | Vue.js | 3.3+ |
| **State Management** | Pinia | 2.1+ |
| **UI Library** | Vuetify | 3.3+ |
| **Build Tool** | Vite | 4.4+ |
| **Backend Framework** | NestJS | 10.0+ |
| **ORM** | TypeORM | 0.3+ |
| **Database** | MySQL | 8.0+ |
| **Authentication** | Passport JWT | 10.0+ |

### Alternative Stacks for Future Reference

#### For Smaller Projects (< 2 weeks)
- **Frontend:** Svelte/SvelteKit
- **Backend:** FastAPI (Python)
- **Reason:** Fastest development, minimal boilerplate

#### For Large Enterprise Projects (3+ months)
- **Frontend:** React + Next.js
- **Backend:** NestJS
- **Reason:** Largest ecosystem, most corporate adoption

#### For Full Python Teams
- **Frontend:** Vue.js or React
- **Backend:** FastAPI
- **Reason:** Team expertise in Python

---

## 5. Conclusion

The selection of **Vue.js 3** and **NestJS** provides the optimal balance for this project considering:

1. **Timeline Constraints** - 1 month is achievable
2. **Team Skills** - NestJS known, Vue.js easy to learn
3. **Project Requirements** - Both suitable for e-commerce
4. **Maintainability** - Clear architecture and type safety
5. **Learning Outcomes** - Modern, marketable skills

This stack enables the team to deliver a high-quality reengineered bookstore application while learning industry-relevant technologies within the given timeframe.

---

**Document Version:** 1.0  
**Last Updated:** October 30, 2025  
**Authors:** SE327 Project Team

