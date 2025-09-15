import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Cloud, 
  Container, 
  GitBranch, 
  Shield, 
  Monitor, 
  Database,
  Terminal,
  Settings,
  Code,
  Zap,
  Award,
  BookOpen
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Cloud Platforms',
    icon: Cloud,
    color: 'from-blue-500 to-cyan-500',
    skills: ['AWS (EC2, ECS, Lambda, S3, DynamoDB, IAM, CloudWatch)', 'Google Cloud Platform'],

  },
  {
    title: 'Container Orchestration',
    icon: Container,
    color: 'from-purple-500 to-pink-500',
    skills: ['Kubernetes', 'Docker', 'Helm Charts', 'Container Registries']
  },
  {
    title: 'CI/CD & Version Control',
    icon: GitBranch,
    color: 'from-green-500 to-teal-500',
    skills: ['GitHub Actions', 'Jenkins', 'Argo CD', 'Git Workflows']
  },
  {
    title: 'Infrastructure as Code',
    icon: Code,
    color: 'from-orange-500 to-red-500',
    skills: ['Terraform', 'Ansible', 'CloudFormation', 'Configuration Management']
  },
  {
    title: 'Monitoring & Observability',
    icon: Monitor,
    color: 'from-indigo-500 to-purple-500',
    skills: ['Prometheus', 'Grafana', 'Instana', 'Custom Log Viewers', 'Real-time Analytics']
  },
  {
    title: 'Programming & Automation',
    icon: Terminal,
    color: 'from-red-500 to-pink-500',
    skills: ['Python', 'Bash', 'PowerShell', 'C#', 'React', 'Automation Scripts']
  }
];

const certifications = [
  {
    title: 'AWS Solutions Architect',
    issuer: 'Coursera Professional Certificate',
    icon: Cloud,
    color: 'from-orange-400 to-orange-600',
    url: 'https://coursera.org/share/67fe2a834771ea49030b33cdc24bee49'
  },
  {
    title: 'IBM DevOps and Software Engineering',
    issuer: 'Coursera Professional Certificate',
    icon: GitBranch,
    color: 'from-blue-400 to-blue-600',
    url: 'https://coursera.org/share/2346af1f2b68f2da812d07a30812cc30'
  },
  {
    title: 'Prompt Engineering',
    issuer: 'Coursera Professional Certificate',
    icon: Zap,
    color: 'from-yellow-400 to-yellow-600',
    url: 'https://coursera.org/share/52d65e864b660f908813aaa0622fea28'
  },
  {
    title: 'Terraform for the Absolute Beginner',
    issuer: 'Coursera Professional Certificate',
    icon: Code,
    color: 'from-purple-400 to-purple-600',
    url: 'https://coursera.org/share/39e2824ec78f4a3cc99d249a5e9a3506'
  },
  {
    title: 'Fundamentals of Ansible',
    issuer: 'Coursera Professional Certificate',
    icon: Settings,
    color: 'from-red-400 to-red-600',
    url: 'https://coursera.org/share/c8aac2e133fc9ae7f7f3d74f96db5229'
  },
  {
    title: 'Preparing for Google Cloud Certification: Cloud DevOps',
    issuer: 'Coursera Professional Certificate',
    icon: Shield,
    color: 'from-green-400 to-green-600',
    url: 'https://coursera.org/share/145d9787a7e6793405eb24aa93d0a127'
  },
  {
    title: 'IBM Back-End Development',
    issuer: 'Coursera Professional Certificate',
    icon: Database,
    color: 'from-indigo-400 to-indigo-600',
    url: 'https://coursera.org/share/28c5f0acf59a3f8796962f629bc4bf7c'
  }
];

const experience = [
  {
    company: 'Intuitive Surgical',
    role: 'Field Support Engineer',
    period: '2023 - Present',
    location: 'Haifa/Tel Aviv',
    highlights: [
      'Support for 30+ medical centers with SLA-compliant high availability',
      'Built scalable automation tools reducing setup time by 50%',
      'Developed React-based log analysis tools for real-time monitoring',
      '560% increase in documented incidents while maintaining reliability'
    ]
  },
  {
    company: 'BEPEX Ltd',
    role: 'Field Service Engineer', 
    period: '2017 - 2023',
    location: 'Qadima',
    highlights: [
      'Rapid support for critical medical systems',
      'Technical liaison between engineering and support teams',
      'Minimized downtime through efficient troubleshooting'
    ]
  },
  {
    company: 'Neviot / Treitel',
    role: 'Field Service Technician',
    period: '2005 - 2016',
    location: 'Israel',
    highlights: [
      'Provided field support, repairs, and calibration for advanced systems',
      'Customer training and technical documentation'
    ]
  },
  {
    company: 'Israeli Air Force – Classified Unit',
    role: 'Technical Instructor & Electrical Technician',
    period: '2002 - 2005',
    location: 'Israel',
    highlights: [
      'Executed hands-on technical repairs and testing on military equipment',
      'Technical training for complex systems'
    ]
  }
];

export default function SkillsShowcase() {
  return (
    <div className="py-20 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Technical Skills */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Technical Expertise</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive skill set spanning field support, cloud infrastructure, automation, and modern DevOps practices
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:shadow-xl h-full min-h-[280px] flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <category.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white leading-tight">{category.title}</h3>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 flex-1 content-start">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (skillIndex * 0.05) }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors duration-200 text-xs"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">Certifications & Training</h3>
          <p className="text-lg text-slate-300">
            Continuous learning and professional development in cloud and DevOps technologies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <Card className="bg-slate-800/30 border-slate-700 hover:border-slate-600 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl h-full min-h-[120px]">
                  <CardContent className="p-6 h-full flex items-center">
                    <div className="flex items-center space-x-4 w-full">
                      <motion.div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${cert.color} flex items-center justify-center flex-shrink-0`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Award className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-200 line-clamp-2 leading-tight">{cert.title}</h4>
                        <p className="text-sm text-slate-400 line-clamp-2">{cert.issuer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Experience Timeline */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">Professional Journey</h3>
          <p className="text-lg text-slate-300">
            15+ years of hands-on experience in field support and system reliability
          </p>
        </motion.div>

        <div className="space-y-8 mb-16">
          {experience.map((job, index) => (
            <motion.div
              key={`${job.company}-${job.period}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-slate-800/30 border-slate-700 hover:border-slate-600 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">{job.role}</h4>
                      <p className="text-xl text-cyan-400 font-semibold">{job.company}</p>
                      <p className="text-slate-400">{job.location}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Badge variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-300">
                        {job.period}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {job.highlights.map((highlight, highlightIndex) => (
                      <motion.div
                        key={highlightIndex}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + highlightIndex * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-300">{highlight}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Experience Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: 'Years Experience', value: '15+', icon: BookOpen, desc: 'Field Support & Engineering' },
            { label: 'Medical Centers', value: '30+', icon: Monitor, desc: 'Mission-Critical Systems' },
            { label: 'Setup Time Reduction', value: '50%', icon: Zap, desc: 'Through Automation' },
            { label: 'Incident Documentation', value: '560%', icon: Settings, desc: 'Process Improvement' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center bg-slate-800/30 rounded-xl p-6 border border-slate-700"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-slate-300 font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-slate-400">{stat.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}