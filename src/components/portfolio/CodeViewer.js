import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { X, Copy, Check, FileText, Terminal, Code, Play } from 'lucide-react';

// Sample code configurations for different stages
const codeConfigurations = {
  cicd: {
    source: {
      title: 'Git Workflow & Branching Strategy',
      language: 'yaml',
      description: 'GitHub Actions workflow for automated CI/CD pipeline',
      code: `name: DevOps Pipeline
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test -- --coverage
      
    - name: Upload coverage
      uses: codecov/codecov-action@v3`,
      tools: ['GitHub Actions', 'Git', 'Codecov']
    },
    build: {
      title: 'Automated Build & Testing',
      language: 'yaml',
      description: 'Docker multi-stage build with automated testing',
      code: `# Multi-stage Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Build application
RUN npm run build

# Run security audit
RUN npm audit --audit-level=moderate

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["npm", "start"]`,
      tools: ['Docker', 'Node.js', 'npm audit']
    },
    security: {
      title: 'Security Scanning & Compliance',
      language: 'yaml',
      description: 'Integrated security scanning with Snyk and SonarQube',
      code: `# Security scanning pipeline
security-scan:
  runs-on: ubuntu-latest
  steps:
  - uses: actions/checkout@v3
  
  - name: Run Snyk to check vulnerabilities
    uses: snyk/actions/node@master
    env:
      SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
    with:
      args: --severity-threshold=high
      
  - name: SonarQube Scan
    uses: sonarqube-quality-gate-action@master
    env:
      SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
      
  - name: OWASP ZAP Scan
    uses: zaproxy/action-full-scan@v0.4.0
    with:
      target: 'https://staging.myapp.com'
      
  - name: Upload SARIF results
    uses: github/codeql-action/upload-sarif@v2
    with:
      sarif_file: results.sarif`,
      tools: ['Snyk', 'SonarQube', 'OWASP ZAP', 'GitHub CodeQL']
    },
    deploy: {
      title: 'Blue-Green Deployment Strategy',
      language: 'yaml',
      description: 'Zero-downtime deployment using AWS ECS and Application Load Balancer',
      code: `# Terraform deployment configuration
resource "aws_ecs_service" "app" {
  name            = "myapp-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.desired_capacity

  deployment_configuration {
    maximum_percent         = 200
    minimum_healthy_percent = 100
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.blue.arn
    container_name   = "app"
    container_port   = 3000
  }

  lifecycle {
    ignore_changes = [task_definition]
  }
}

# Blue-Green deployment script
resource "aws_lb_target_group" "blue" {
  name     = "app-blue-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    path                = "/health"
    healthy_threshold   = 2
    unhealthy_threshold = 10
  }
}`,
      tools: ['Terraform', 'AWS ECS', 'Application Load Balancer', 'Blue-Green Deployment']
    },
    monitor: {
      title: 'Monitoring & Observability Stack',
      language: 'yaml',
      description: 'Comprehensive monitoring with Prometheus, Grafana, and ELK stack',
      code: `# Prometheus configuration
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'myapp'
    static_configs:
      - targets: ['app:3000']
    metrics_path: '/metrics'
    scrape_interval: 10s

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

# Grafana dashboard as code
dashboard:
  title: "Application Performance"
  panels:
    - title: "Response Time"
      type: graph
      targets:
        - expr: "rate(http_request_duration_seconds[5m])"
    - title: "Error Rate"
      type: stat
      targets:
        - expr: "rate(http_requests_total{status=~'5..'}[5m])"`,
      tools: ['Prometheus', 'Grafana', 'AlertManager', 'Node Exporter']
    }
  },
  iac: {
    planning: {
      title: 'Infrastructure Requirements Planning',
      language: 'hcl',
      description: 'Terraform configuration for AWS infrastructure planning',
      code: `# variables.tf
variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "instance_types" {
  description = "EC2 instance types for different tiers"
  type = map(string)
  default = {
    web = "t3.medium"
    app = "t3.large"
    db  = "r5.xlarge"
  }
}

# Resource planning with locals
locals {
  common_tags = {
    Environment = var.environment
    Project     = "myapp"
    ManagedBy   = "terraform"
    Owner       = "devops-team"
  }
  
  availability_zones = data.aws_availability_zones.available.names
  
  # Calculate subnet CIDRs
  subnet_cidrs = {
    public  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
    private = ["10.0.10.0/24", "10.0.20.0/24", "10.0.30.0/24"]
    data    = ["10.0.100.0/24", "10.0.200.0/24"]
  }
}`,
      tools: ['Terraform', 'AWS', 'Infrastructure Planning', 'Resource Tagging']
    },
    coding: {
      title: 'Infrastructure as Code Templates',
      language: 'hcl',
      description: 'Modular Terraform configuration with best practices',
      code: `# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket         = "myapp-terraform-state"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

# VPC Module
module "vpc" {
  source = "./modules/vpc"
  
  name               = "myapp-vpc"
  cidr               = "10.0.0.0/16"
  availability_zones = local.availability_zones
  public_subnets     = local.subnet_cidrs.public
  private_subnets    = local.subnet_cidrs.private
  
  enable_nat_gateway = true
  enable_vpn_gateway = false
  
  tags = local.common_tags
}

# EKS Cluster
module "eks" {
  source = "./modules/eks"
  
  cluster_name    = "myapp-cluster"
  cluster_version = "1.28"
  
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets
  
  node_groups = {
    main = {
      instance_types = ["t3.medium"]
      min_size       = 2
      max_size       = 10
      desired_size   = 3
    }
  }
  
  tags = local.common_tags
}`,
      tools: ['Terraform', 'AWS VPC', 'EKS', 'Modular Architecture']
    },
    validation: {
      title: 'Infrastructure Validation & Testing',
      language: 'bash',
      description: 'Automated validation pipeline with security and compliance checks',
      code: `#!/bin/bash
# validate_infrastructure.sh

set -e

echo "🔍 Running Terraform validation..."

# Format check
terraform fmt -check -recursive

# Validate configuration
terraform validate

# Security scanning with Checkov
echo "🛡️ Running security scan..."
checkov -d . --framework terraform \\
  --check CKV_AWS_2,CKV_AWS_3,CKV_AWS_20 \\
  --output cli --output sarif \\
  --output-file-path checkov-results.sarif

# Cost estimation with Infracost
echo "💰 Calculating infrastructure costs..."
infracost breakdown --path . \\
  --format json \\
  --out-file infracost-base.json

# Policy validation with Open Policy Agent
echo "📋 Validating policies..."
opa test policies/ \\
  --coverage \\
  --format json

# Terraform plan validation
echo "📋 Generating execution plan..."
terraform plan \\
  -var-file="environments/\${ENVIRONMENT}.tfvars" \\
  -out="tfplan" \\
  -detailed-exitcode

# Plan analysis with tf-summarize
tf-summarize tfplan

echo "✅ All validation checks passed!"`,
      tools: ['Checkov', 'Infracost', 'Open Policy Agent', 'terraform validate']
    },
    provision: {
      title: 'Automated Infrastructure Provisioning',
      language: 'yaml',
      description: 'GitLab CI/CD pipeline for infrastructure deployment',
      code: `# .gitlab-ci.yml
stages:
  - validate
  - plan
  - apply
  - test

variables:
  TF_ROOT: infrastructure
  TF_STATE_NAME: \${CI_COMMIT_REF_SLUG}

.terraform_base: &terraform_base
  image: hashicorp/terraform:1.6
  before_script:
    - cd \$TF_ROOT
    - terraform --version
    - terraform init -backend-config="key=\$TF_STATE_NAME.tfstate"

validate:
  <<: *terraform_base
  stage: validate
  script:
    - terraform validate
    - terraform fmt -check

plan:
  <<: *terraform_base
  stage: plan
  script:
    - terraform plan -var-file="environments/\${ENVIRONMENT}.tfvars" -out=tfplan
    - terraform show -json tfplan > tfplan.json
  artifacts:
    paths:
      - \$TF_ROOT/tfplan
      - \$TF_ROOT/tfplan.json
    expire_in: 1 week

apply:
  <<: *terraform_base
  stage: apply
  script:
    - terraform apply tfplan
  dependencies:
    - plan
  when: manual
  only:
    - main
    - production

infrastructure_test:
  stage: test
  image: alpine:latest
  before_script:
    - apk add --no-cache curl jq
  script:
    - ./scripts/test_infrastructure.sh
  dependencies:
    - apply`,
      tools: ['GitLab CI/CD', 'Terraform', 'Infrastructure Testing', 'State Management']
    },
    manage: {
      title: 'Infrastructure Lifecycle Management',
      language: 'python',
      description: 'Python automation scripts for ongoing infrastructure management',
      code: `#!/usr/bin/env python3
"""
Infrastructure management automation script
Handles scaling, updates, and maintenance tasks
"""

import boto3
import json
import logging
from datetime import datetime, timedelta

class InfrastructureManager:
    def __init__(self, environment):
        self.environment = environment
        self.ec2 = boto3.client('ec2')
        self.ecs = boto3.client('ecs')
        self.cloudwatch = boto3.client('cloudwatch')
        
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    def auto_scale_services(self):
        """Auto-scale ECS services based on CloudWatch metrics"""
        try:
            # Get CPU utilization metrics
            response = self.cloudwatch.get_metric_statistics(
                Namespace='AWS/ECS',
                MetricName='CPUUtilization',
                Dimensions=[
                    {'Name': 'ServiceName', 'Value': f'myapp-{self.environment}'},
                    {'Name': 'ClusterName', 'Value': f'myapp-cluster-{self.environment}'}
                ],
                StartTime=datetime.utcnow() - timedelta(minutes=15),
                EndTime=datetime.utcnow(),
                Period=300,
                Statistics=['Average']
            )
            
            if response['Datapoints']:
                avg_cpu = sum(dp['Average'] for dp in response['Datapoints']) / len(response['Datapoints'])
                
                if avg_cpu > 70:
                    self.scale_service(scale_up=True)
                elif avg_cpu < 30:
                    self.scale_service(scale_up=False)
                    
        except Exception as e:
            self.logger.error(f"Auto-scaling failed: {str(e)}")
    
    def cleanup_unused_resources(self):
        """Clean up unused AWS resources to optimize costs"""
        # Find unattached EBS volumes
        volumes = self.ec2.describe_volumes(
            Filters=[{'Name': 'status', 'Values': ['available']}]
        )
        
        for volume in volumes['Volumes']:
            if volume['CreateTime'] < datetime.now() - timedelta(days=7):
                self.logger.info(f"Deleting unused volume: {volume['VolumeId']}")
                # self.ec2.delete_volume(VolumeId=volume['VolumeId'])
    
    def generate_cost_report(self):
        """Generate infrastructure cost analysis"""
        # Implementation for cost analysis
        pass

if __name__ == "__main__":
    manager = InfrastructureManager('production')
    manager.auto_scale_services()
    manager.cleanup_unused_resources()`,
      tools: ['Python', 'boto3', 'CloudWatch', 'Cost Optimization']
    }
  },
  containers: {
    containerize: {
      title: 'Application Containerization',
      language: 'dockerfile',
      description: 'Optimized Docker containerization with multi-stage builds',
      code: `# Multi-stage Dockerfile for Node.js application
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --silent

FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build
RUN npm run test

FROM node:18-alpine AS runtime
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app
COPY --from=dependencies --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nextjs:nodejs /app/dist ./dist
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs

# Security headers and optimizations
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max_old_space_size=1024"

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]

# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.env.local`,
      tools: ['Docker', 'Multi-stage builds', 'Security hardening', 'Health checks']
    },
    orchestrate: {
      title: 'Kubernetes Deployment Configuration',
      language: 'yaml',
      description: 'Production-ready Kubernetes manifests with best practices',
      code: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: production
  labels:
    app: myapp
    version: v1.0.0
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
        version: v1.0.0
    spec:
      serviceAccountName: myapp
      securityContext:
        fsGroup: 1001
        runAsNonRoot: true
        runAsUser: 1001
      containers:
      - name: myapp
        image: myregistry.com/myapp:v1.0.0
        ports:
        - containerPort: 3000
          name: http
        env:
        - name: NODE_ENV
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: database-url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
        volumeMounts:
        - name: config
          mountPath: /app/config
          readOnly: true
      volumes:
      - name: config
        configMap:
          name: myapp-config

---
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
  namespace: production
spec:
  selector:
    app: myapp
  ports:
  - name: http
    port: 80
    targetPort: 3000
  type: ClusterIP`,
      tools: ['Kubernetes', 'Rolling Updates', 'Health Checks', 'Resource Limits']
    },
    scale: {
      title: 'Horizontal Pod Autoscaling',
      language: 'yaml',
      description: 'Advanced autoscaling with custom metrics and VPA',
      code: `# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "100"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 50
        periodSeconds: 30

---
# vpa.yaml  
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: myapp-vpa
  namespace: production
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  updatePolicy:
    updateMode: "Auto"
  resourcePolicy:
    containerPolicies:
    - containerName: myapp
      maxAllowed:
        cpu: 2
        memory: 4Gi
      minAllowed:
        cpu: 100m
        memory: 128Mi`,
      tools: ['HPA', 'VPA', 'Custom Metrics', 'Scaling Policies']
    },
    loadbalance: {
      title: 'Service Mesh & Load Balancing',
      language: 'yaml',
      description: 'Istio service mesh configuration with advanced traffic management',
      code: `# virtualservice.yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: myapp-vs
  namespace: production
spec:
  hosts:
  - myapp.example.com
  gateways:
  - myapp-gateway
  http:
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: myapp-service
        subset: canary
      weight: 100
  - route:
    - destination:
        host: myapp-service
        subset: stable
      weight: 90
    - destination:
        host: myapp-service
        subset: canary
      weight: 10
    fault:
      delay:
        percentage:
          value: 0.1
        fixedDelay: 5s
    retries:
      attempts: 3
      perTryTimeout: 2s
      retryOn: 5xx

---
# destinationrule.yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: myapp-dr
  namespace: production
spec:
  host: myapp-service
  trafficPolicy:
    loadBalancer:
      simple: LEAST_CONN
    connectionPool:
      tcp:
        maxConnections: 10
      http:
        http1MaxPendingRequests: 10
        maxRequestsPerConnection: 2
    circuitBreaker:
      consecutive5xxErrors: 3
      intervalDuration: 30s
      baseEjectionTime: 30s
  subsets:
  - name: stable
    labels:
      version: v1.0.0
    trafficPolicy:
      portLevelSettings:
      - port:
          number: 3000
        connectionPool:
          tcp:
            maxConnections: 20
  - name: canary
    labels:
      version: v1.1.0`,
      tools: ['Istio', 'Service Mesh', 'Circuit Breakers', 'Canary Deployments']
    },
    observe: {
      title: 'Observability & Monitoring Stack',
      language: 'yaml',
      description: 'Complete observability setup with Prometheus, Jaeger, and Grafana',
      code: `# servicemonitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: myapp-metrics
  namespace: production
  labels:
    app: myapp
spec:
  selector:
    matchLabels:
      app: myapp
  endpoints:
  - port: metrics
    interval: 15s
    path: /metrics
    honorLabels: true

---
# prometheusrule.yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: myapp-alerts
  namespace: production
spec:
  groups:
  - name: myapp.rules
    rules:
    - alert: HighErrorRate
      expr: |
        rate(http_requests_total{job="myapp",status=~"5.."}[5m]) /
        rate(http_requests_total{job="myapp"}[5m]) > 0.05
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "High error rate detected"
        description: "Error rate is {{ $value | humanizePercentage }}"
    
    - alert: HighLatency
      expr: |
        histogram_quantile(0.95,
          rate(http_request_duration_seconds_bucket[5m])
        ) > 0.5
      for: 10m
      labels:
        severity: critical
      annotations:
        summary: "High latency detected"

---
# jaeger-tracing.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: jaeger-config
  namespace: production
data:
  config.yaml: |
    sampling:
      type: probabilistic
      param: 0.1
    reporter:
      logSpans: false
      localAgentHostPort: jaeger-agent:6831
    headers:
      jaegerDebugHeader: jaeger-debug-id
      jaegerBaggageHeader: jaeger-baggage`,
      tools: ['Prometheus', 'Grafana', 'Jaeger', 'ServiceMonitor', 'AlertManager']
    }
  }
};

export default function CodeViewer({ processId, stageId, onClose, isExecuting, stageName }) {
  const [copiedStates, setCopiedStates] = useState({});
  const [activeTab, setActiveTab] = useState('code');
  const [executedLines, setExecutedLines] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const config = codeConfigurations[processId]?.[stageId];
  const codeLines = config ? config.code.split('\n') : [];

  // Simulate line-by-line execution
  useEffect(() => {
    if (!config || !isExecuting) return;

    let currentLine = 0;
    const executeNextLine = () => {
      if (currentLine < codeLines.length) {
        setExecutedLines(prev => [...prev, currentLine]);
        currentLine++;
        setTimeout(executeNextLine, 100); // Execute one line every 100ms
      } else {
        setIsCompleted(true);
      }
    };

    setTimeout(executeNextLine, 500); // Start after 500ms delay

    return () => {
      setExecutedLines([]);
      setIsCompleted(false);
    };
  }, [isExecuting, codeLines.length, config]);

  const handleCopy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Early return after hooks
  if (!config) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-slate-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{config.title}</h3>
              <p className="text-slate-400">{config.description}</p>
              {isExecuting && (
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">
                    {isCompleted ? `${stageName} - COMPLETED` : `Executing ${stageName}...`}
                  </span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[70vh]">
          {/* Tabs */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'code'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('code')}
              >
                <Terminal className="w-4 h-4 inline mr-2" />
                Code
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'tools'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('tools')}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Tools & Technologies
              </button>
            </div>
            
            {!isExecuting && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(config.code, 'main')}
                className="bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
              >
                {copiedStates.main ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'code' && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="h-full p-6 overflow-auto"
                >
                  <div className="bg-slate-950 rounded-xl p-6 overflow-auto">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="bg-slate-800 border-slate-600 text-slate-300">
                        {config.language}
                      </Badge>
                      {isExecuting && (
                        <div className="flex items-center space-x-2 text-green-400 text-sm">
                          <Play className="w-4 h-4" />
                          <span>Executing line by line...</span>
                        </div>
                      )}
                    </div>
                    <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap leading-relaxed">
                      {codeLines.map((line, index) => (
                        <motion.div
                          key={index}
                          className={`transition-all duration-300 ${
                            isExecuting && executedLines.includes(index)
                              ? 'bg-green-500/20 text-green-100 px-2 py-1 rounded'
                              : isExecuting && index === executedLines.length
                              ? 'bg-yellow-500/20 text-yellow-100 px-2 py-1 rounded animate-pulse'
                              : ''
                          }`}
                          initial={isExecuting ? { backgroundColor: 'transparent' } : undefined}
                          animate={
                            isExecuting && executedLines.includes(index)
                              ? { backgroundColor: 'rgba(34, 197, 94, 0.2)' }
                              : {}
                          }
                        >
                          <code>{line}</code>
                        </motion.div>
                      ))}
                    </pre>
                    {isCompleted && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
                      >
                        <div className="flex items-center space-x-2 text-green-400">
                          <Check className="w-5 h-5" />
                          <span className="font-semibold">Execution completed successfully!</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'tools' && (
                <motion.div
                  key="tools"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full p-6 overflow-auto"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {config.tools.map((tool, index) => (
                      <motion.div
                        key={tool}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-800 rounded-xl p-4 hover:bg-slate-750 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {tool.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{tool}</h4>
                            <p className="text-slate-400 text-sm">Production-ready configuration</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}