# 🚀 Deployment Guide

## Frontend Deployment

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Or use Netlify UI**
   - Go to [Netlify](https://www.netlify.com/)
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Deploy!

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Or use Vercel UI**
   - Go to [Vercel](https://vercel.com/)
   - Import GitHub repository
   - Deploy automatically

### Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   "homepage": "https://yourusername.github.io/bus-booking-frontend-react",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## Backend Deployment

### Deploy to Heroku

1. **Create Heroku account** at [Heroku](https://www.heroku.com/)

2. **Install Heroku CLI**
   ```bash
   # Mac
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from heroku.com
   ```

3. **Login to Heroku**
   ```bash
   heroku login
   ```

4. **Create app**
   ```bash
   heroku create bus-booking-backend
   ```

5. **Add MongoDB addon**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

### Deploy to Railway

1. **Go to [Railway](https://railway.app/)**

2. **Connect GitHub repository**

3. **Add MongoDB database**

4. **Set environment variables**
   ```
   MONGODB_URI=your_mongodb_uri
   STRIPE_API_KEY=your_stripe_key
   ```

5. **Deploy automatically**

### Deploy to AWS

1. **Create EC2 instance**

2. **Install Java and Maven**
   ```bash
   sudo yum install java-17-openjdk
   sudo yum install maven
   ```

3. **Clone repository**
   ```bash
   git clone https://github.com/sampurnv/bus-booking-backend-springboot.git
   ```

4. **Build and run**
   ```bash
   mvn clean package
   java -jar target/*.jar
   ```

### Deploy to Docker

1. **Create Dockerfile** (already in repo)

2. **Build image**
   ```bash
   docker build -t bus-booking-backend .
   ```

3. **Run container**
   ```bash
   docker run -p 8080:8080 bus-booking-backend
   ```

4. **Push to Docker Hub**
   ```bash
   docker tag bus-booking-backend yourusername/bus-booking-backend
   docker push yourusername/bus-booking-backend
   ```

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_STRIPE_KEY=pk_live_your_key
REACT_APP_RAZORPAY_KEY=rzp_live_your_key
```

### Backend (application.properties)
```
spring.data.mongodb.uri=${MONGODB_URI}
spring.mail.username=${EMAIL_USERNAME}
spring.mail.password=${EMAIL_PASSWORD}
stripe.api.key=${STRIPE_API_KEY}
razorpay.key.id=${RAZORPAY_KEY_ID}
```

## Production Checklist

### Backend
- [ ] Update MongoDB URI to production
- [ ] Set production email credentials
- [ ] Use production payment keys
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure logging
- [ ] Set up backups

### Frontend
- [ ] Update API URL to production
- [ ] Use production payment keys
- [ ] Enable analytics
- [ ] Optimize images
- [ ] Enable caching
- [ ] Set up CDN
- [ ] Configure SEO

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
sudo apt-get install certbot
sudo certbot --nginx -d yourdomain.com
```

### Using Cloudflare (Free)

1. Add site to Cloudflare
2. Update nameservers
3. Enable SSL (Full)

## Monitoring

### Backend Monitoring
- Use Spring Boot Actuator
- Set up logging (ELK stack)
- Monitor API performance

### Frontend Monitoring
- Google Analytics
- Sentry for error tracking
- Performance monitoring

## Backup Strategy

### MongoDB Backups

```bash
# Backup
mongodump --uri="mongodb://localhost:27017/bus_booking_db" --out=/backup/

# Restore
mongorestore --uri="mongodb://localhost:27017/bus_booking_db" /backup/bus_booking_db/
```

### Automated Backups
- Use MongoDB Atlas automated backups
- Set up cron jobs for local backups
- Store backups in cloud storage

## Performance Optimization

### Backend
- Enable caching
- Database indexing
- Connection pooling
- Async operations

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Minification

---

**Ready for production! 🚀**