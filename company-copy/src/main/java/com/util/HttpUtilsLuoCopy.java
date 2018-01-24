package com.util;

	import java.io.ByteArrayOutputStream;
	import java.io.DataOutputStream;
	import java.io.IOException;
	import java.io.InputStream;
	import java.net.URL;
	import java.security.KeyManagementException;
	import java.security.NoSuchAlgorithmException;
	import java.security.cert.CertificateException;
	import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.net.ssl.HostnameVerifier;
	import javax.net.ssl.HttpsURLConnection;
	import javax.net.ssl.SSLContext;
	import javax.net.ssl.SSLSession;
	import javax.net.ssl.TrustManager;
	import javax.net.ssl.X509TrustManager;

import com.alibaba.fastjson.JSONObject;

	public class HttpUtilsLuoCopy {
	    private static class TrustAnyTrustManager implements X509TrustManager {

	        public void checkClientTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
	            // TODO Auto-generated method stub

	        }

	        public void checkServerTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
	            // TODO Auto-generated method stub

	        }

	        public X509Certificate[] getAcceptedIssuers() {
	            // TODO Auto-generated method stub
	            return null;
	        }  

	    }  

	    private static class TrustAnyHostnameVerifier implements HostnameVerifier {

	        public boolean verify(String arg0, SSLSession arg1) {
	            // TODO Auto-generated method stub
	            return false;
	        }  
	    }  

	    /** 
	     * post方式请求服务器(https协议) 
	     *  
	     * @param url 
	     *            请求地址 
	     * @param content 
	     *            参数 
	     * @param charset 
	     *            编码 
	     * @return 
	     * @throws NoSuchAlgorithmException 
	     * @throws KeyManagementException 
	     * @throws IOException   
	     */  
	    public static byte[] post(String url, String content, String charset)  
	            throws NoSuchAlgorithmException, KeyManagementException,  
	            IOException {  
	        SSLContext sc = SSLContext.getInstance("SSL");  
	        sc.init(null, new TrustManager[] { new TrustAnyTrustManager() },  
	                new java.security.SecureRandom());  

	        URL console = new URL(url);  
	        HttpsURLConnection conn = (HttpsURLConnection) console.openConnection();  
	        conn.setSSLSocketFactory(sc.getSocketFactory());  
	        conn.setHostnameVerifier(new TrustAnyHostnameVerifier());  
	        conn.setDoOutput(true);  
	        conn.connect();  
	        DataOutputStream out = new DataOutputStream(conn.getOutputStream());  
	        out.write(content.getBytes(charset));  
	        // 刷新、关闭  
	        out.flush();  
	        out.close();  
	        InputStream is = conn.getInputStream();  
	        if (is != null) {  
	            ByteArrayOutputStream outStream = new ByteArrayOutputStream();  
	            byte[] buffer = new byte[1024];  
	            int len = 0;  
	            while ((len = is.read(buffer)) != -1) {  
	                outStream.write(buffer, 0, len);  
	            }  
	            is.close();  
	            return outStream.toByteArray();  
	        }  
	        return null;  
	    }  
	    
	    public static void main(String args[]) throws Exception {  
			  try {
		            JSONObject header = new JSONObject();
		            header.put("username", "乐清南田");//用户名
		            header.put("password", "weiming");//用户密码
		            header.put("token", "eee816312f6c9c3cc89e03eed3af0626");//申请到的token
		            header.put("account_type", "1");
		            
		            String urlStr = "https://api.baidu.com/json/tongji/v1/ReportService/getSiteList";
		            String charset = "utf-8";
		            JSONObject params = new JSONObject();
		            params.put("header", header);
		            byte[] res = HttpUtilsLuoCopy.post(urlStr, params.toString(), charset);
		            String s = new String(res);
		            System.out.println(s);    
		        } catch (Exception e) {
		            // TODO: handle exception
		            e.printStackTrace();
		        }
			
		}


}

