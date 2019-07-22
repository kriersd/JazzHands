# CloudFlare Jazz Hands Demo: 

Please see the MKDocs GitHub Pages Site for complete documentation. 

[https://kriersd.github.io/JazzHands/](https://kriersd.github.io/JazzHands/)


# Working Demo
    
[http://www.jazzhands-bitcoin.com](http://www.jazzhands-bitcoin.com)

![](images/jazzhands-site.png)

The application is a simple Node.JS applciation that shows all venue's in a specific area that accepts Bitcoins as payments. The application isn't anything too special, it just allows us to demonstrate the use of CloudFlare. 

# The Demo Environment

We have configured two Kubernetes clusters for this demonstration. Both are currently running in the IBM Public Cloud. 

* IKS 
* OpenShift

Cloudflare has been configured to balance the load across both clusters. 

![](images/env.png)

# Demo Steps

* Go to the app site. www.jazzhands-bitcoin.com
* You will see the icon in the upper left hand that shows which cluster this page was served from. You will also see a 60 second count down timer. CloudFlare will cache the session for 60 seconds, so any attempts to refresh the page within 60 seconds you will be routed back to the existing cluster. After the 60 second session timeout, it will load balance the next request, which may or may not route you back to the same cluster. Eventually you will see that it will route you to the other cluster. It may take a few trys though. 

# What's the point here?

* We are demonstrating the ability to leverage multiple Kubernetes clusters to host your application with CloudFlare being the load balancer to spread the load across these seemingly unrelated clusters. This type of configuration brings a level of high availability and disaster recovery capabilities. 
