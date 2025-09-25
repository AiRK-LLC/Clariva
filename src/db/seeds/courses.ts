import { db } from '@/db';
import { courses } from '@/db/schema';

async function main() {
    const currentTime = new Date().toISOString();
    
    const sampleCourses = [
        {
            slug: 'ai-foundations',
            title: 'AI Foundations',
            level: 'Beginner',
            durationWeeks: 6,
            priceAed: 2500,
            imageUrl: '/images/courses/ai-foundations.jpg',
            description: 'Master the fundamentals of artificial intelligence and machine learning. Perfect for beginners looking to enter the AI field with hands-on projects and real-world applications.',
            createdAt: currentTime,
            updatedAt: currentTime,
        },
        {
            slug: 'machine-learning-engineer',
            title: 'Machine Learning Engineer',
            level: 'Intermediate',
            durationWeeks: 8,
            priceAed: 4800,
            imageUrl: '/images/courses/ml-engineer.jpg',
            description: 'Advanced machine learning techniques and engineering practices. Learn to build, deploy, and scale ML models in production environments with industry best practices.',
            createdAt: currentTime,
            updatedAt: currentTime,
        },
        {
            slug: 'deep-learning-pytorch',
            title: 'Deep Learning with PyTorch',
            level: 'Advanced',
            durationWeeks: 8,
            priceAed: 5500,
            imageUrl: '/images/courses/deep-learning-pytorch.jpg',
            description: 'Deep dive into neural networks and deep learning using PyTorch. Master convolutional networks, RNNs, transformers, and cutting-edge architectures.',
            createdAt: currentTime,
            updatedAt: currentTime,
        },
        {
            slug: 'generative-ai-llms',
            title: 'Generative AI & LLMs',
            level: 'Advanced',
            durationWeeks: 6,
            priceAed: 6200,
            imageUrl: '/images/courses/generative-ai-llms.jpg',
            description: 'Explore the world of generative AI and large language models. Build your own chatbots, image generators, and learn prompt engineering techniques.',
            createdAt: currentTime,
            updatedAt: currentTime,
        },
    ];

    await db.insert(courses).values(sampleCourses);
    
    console.log('✅ Courses seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});